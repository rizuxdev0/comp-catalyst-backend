import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaySlip } from './entities/payslip.entity';
import { PremiumType } from './entities/premium-type.entity';
import { EmployeePremium } from './entities/employee-premium.entity';
import { SalaryDeduction } from './entities/salary-deduction.entity';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/entities/employee.entity';
import { AuditModule } from '../audit/audit.module';

import { CompanySettings } from '../settings/entities/company-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaySlip, Employee, PremiumType, EmployeePremium, SalaryDeduction, CompanySettings]),
    forwardRef(() => EmployeesModule),
    AuditModule,
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
