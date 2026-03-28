import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from './entities/user-role.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'List all users (Admin only)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user manually (Admin only)' })
  create(@Body() userData: any) {
    return this.usersService.create(userData);
  }

  @Patch(':id/role')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Update user role (Admin only)' })
  updateRole(@Param('id') id: string, @Body('role') role: AppRole) {
    return this.usersService.updateRole(id, role);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('profile/me')
  @ApiOperation({ summary: 'Update own profile' })
  updateProfile(@Req() req, @Body() data: any) {
    return this.usersService.update(req.user.id, data);
  }

  @Patch('profile/change-password')
  @ApiOperation({ summary: 'Change own password' })
  changePassword(@Req() req, @Body() data: any) {
    return this.usersService.changePassword(req.user.id, data.newPassword);
  }
}
