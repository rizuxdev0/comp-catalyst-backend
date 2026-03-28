import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { CareerHistory } from './entities/career-history.entity';
import { HRDocument } from './entities/hr-document.entity';
import { StaffDelegate, DelegateSetting } from './entities/staff-delegate.entity';
import { EmployeeUpdateRequest } from './entities/employee-update-request.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { StaffDelegatesService } from './staff-delegates.service';
import { StaffDelegatesController } from './staff-delegates.controller';
import { DepartmentsModule } from '../departments/departments.module';
import { HrDocumentsModule } from '../hr-documents/hr-documents.module';
import { AuditModule } from '../audit/audit.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { Department } from '../departments/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee, 
      CareerHistory, 
      HRDocument,
      StaffDelegate, 
      DelegateSetting, 
      EmployeeUpdateRequest,
      Department
    ]),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => HrDocumentsModule),
    AuditModule,
    NotificationsModule,
  ],
  controllers: [EmployeesController, StaffDelegatesController],
  providers: [EmployeesService, StaffDelegatesService],
  exports: [EmployeesService, StaffDelegatesService],
})
export class EmployeesModule {}

