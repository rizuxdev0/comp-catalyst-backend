import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { Permission } from './entities/permission.entity';
import { UserExtraPermission } from './entities/user-extra-permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Employee } from '../employees/entities/employee.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PermissionsController } from './permissions.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Permission, UserExtraPermission, RolePermission, Employee]),
    AuditModule,
  ],
  controllers: [UsersController, PermissionsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
