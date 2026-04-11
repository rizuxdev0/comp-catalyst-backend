import { Controller, Post, UseGuards, Request, Body, Get, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { API_PREFIX } from '../common/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Return JWT token and user info' })
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const data = await this.authService.login(req.user);
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
    
    if (data.refresh_token) {
      res.cookie('refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: `/${API_PREFIX}/auth/refresh`,
      });
    }

    return data;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  async refresh(@Request() req, @Res({ passthrough: true }) res) {
    const refreshToken = req.cookies?.['refresh_token'] || req.body?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    
    const data = await this.authService.refresh(refreshToken);
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
    
    res.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: `/${API_PREFIX}/auth/refresh`,
    });

    return data;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and clear cookies' })
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: `/${API_PREFIX}/auth/refresh` });
    return { success: true };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user info' })
  async getProfile(@Request() req) {
    return this.authService.getMe(req.user);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  async resetPassword(
    @Body('token') token: string,
    @Body('password') newPass: string,
  ) {
    return this.authService.resetPassword(token, newPass);
  }
}
