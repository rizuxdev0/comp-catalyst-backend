import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user effective permissions' })
  async findMyPermissions(@Request() req) {
    return this.usersService.getEffectivePermissions(req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all system permissions' })
  async findAll() {
    return this.usersService.findAllPermissions();
  }

  @Get('roles')
  @ApiOperation({ summary: 'Get role permissions mapping' })
  async findRolePermissions() {
    return this.usersService.getRolePermissionsMapping();
  }

  @Roles(AppRole.ADMIN)
  @Patch('roles/:role/:permissionId')
  @ApiOperation({ summary: 'Toggle permission for a role' })
  async toggleRolePermission(
    @Param('role') role: string,
    @Param('permissionId') permissionId: string,
    @Body('granted') granted: boolean,
  ) {
    return this.usersService.updateRolePermission(role, permissionId, granted);
  }

  @Get('users/:userId')
  @ApiOperation({ summary: 'Get extra permissions for a user' })
  async findUserExtraPermissions(@Param('userId') userId: string) {
    return this.usersService.getUserExtraPermissions(userId);
  }

  @Roles(AppRole.ADMIN)
  @Post('users/:userId')
  @ApiOperation({ summary: 'Grant extra permission to a user' })
  async grantUserPermission(
    @Param('userId') userId: string,
    @Body('permissionId') permissionId: string,
    @Body('expiresAt') expiresAt?: Date,
  ) {
    return this.usersService.grantUserExtraPermission(userId, permissionId, expiresAt);
  }

  @Roles(AppRole.ADMIN)
  @Delete('users/:userId/:permissionId')
  @ApiOperation({ summary: 'Revoke extra permission from a user' })
  async revokeUserPermission(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.usersService.revokeUserExtraPermission(userId, permissionId);
  }

  @Roles(AppRole.ADMIN)
  @Get('export')
  @ApiOperation({ summary: 'Export role permissions as JSON' })
  async exportPermissions() {
    return this.usersService.exportRolePermissions();
  }

  @Roles(AppRole.ADMIN)
  @Post('import')
  @ApiOperation({ summary: 'Import role permissions from JSON mapping' })
  async importPermissions(@Body() mapping: Record<string, string[]>) {
    return this.usersService.importRolePermissions(mapping);
  }
}
