import { Repository } from 'typeorm';
import { PaySlip } from './entities/payslip.entity';
import { Employee } from '../employees/entities/employee.entity';
import { AuditService } from '../audit/audit.service';
import { PremiumType } from './entities/premium-type.entity';
import { EmployeePremium } from './entities/employee-premium.entity';
import { SalaryDeduction } from './entities/salary-deduction.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';
export declare class PayrollService {
    private payslipRepository;
    private employeeRepository;
    private premiumTypeRepository;
    private employeePremiumRepository;
    private deductionRepository;
    private settingsRepository;
    private auditService;
    constructor(payslipRepository: Repository<PaySlip>, employeeRepository: Repository<Employee>, premiumTypeRepository: Repository<PremiumType>, employeePremiumRepository: Repository<EmployeePremium>, deductionRepository: Repository<SalaryDeduction>, settingsRepository: Repository<CompanySettings>, auditService: AuditService);
    generateDraft(employeeId: string, month: number, year: number): Promise<PaySlip>;
    generateBulk(month: number, year: number, departmentId?: string): Promise<any>;
    findAll(filters: any): Promise<PaySlip[]>;
    findOne(id: string): Promise<PaySlip>;
    validate(id: string, userId: string): Promise<PaySlip>;
    markAsPaid(id: string): Promise<PaySlip>;
}
