import { SetMetadata } from '@nestjs/common';
import { AppRole } from '../../users/entities/user-role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
