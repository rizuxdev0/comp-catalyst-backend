import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayPlan } from './entities/holiday-plan.entity';
import { HolidayPlanService } from './holiday-plan.service';
import { HolidayPlanController } from './holiday-plan.controller';
import { EmployeesModule } from '../employees/employees.module';
import { AuditModule } from '../audit/audit.module';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HolidayPlan, Employee]),
    EmployeesModule,
    AuditModule
  ],
  controllers: [HolidayPlanController],
  providers: [HolidayPlanService],
  exports: [HolidayPlanService],
})
export class HolidayPlanModule {}
