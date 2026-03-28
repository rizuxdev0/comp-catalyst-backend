import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { AppRole } from '../../users/entities/user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // 1. Admin always has access
    const isAdmin = user.roles?.some(r => r.role === AppRole.ADMIN);
    if (isAdmin) return true;

    // 2. Check Roles
    const hasRole = requiredRoles ? requiredRoles.some((role) => user.roles?.some(r => r.role === role)) : false;

    // 3. Check All Permissions (Effective = Role-based + Extra)
    const hasPermission = requiredPermissions ? requiredPermissions.some((perm) => user.permissions?.includes(perm)) : false;

    return hasRole || hasPermission;
  }
}
