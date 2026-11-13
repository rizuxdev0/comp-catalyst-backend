import { PayrollService } from './payroll.service';
import { PaySlip, PaySlipStatus } from './entities/payslip.entity';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    generateDraft(employeeId: string, month: number, year: number): Promise<PaySlip>;
    generateBulk(month: number, year: number, departmentId?: string): Promise<any>;
    findAll(employeeId?: string, month?: number, year?: number, status?: PaySlipStatus): Promise<PaySlip[]>;
    findMyPayslips(req: any, year?: number): Promise<PaySlip[]>;
    findOne(id: string): Promise<PaySlip>;
    validate(id: string, req: any): Promise<PaySlip>;
    findAllPremiumTypes(): Promise<import("./entities/premium-type.entity").PremiumType[]>;
    findEmployeePremiums(employeeId?: string): Promise<import("./entities/employee-premium.entity").EmployeePremium[]>;
    createEmployeePremium(data: any): Promise<import("./entities/employee-premium.entity").EmployeePremium[]>;
    pay(id: string): Promise<PaySlip>;
    updateEmployeePremium(id: string, data: any): Promise<import("./entities/employee-premium.entity").EmployeePremium>;
    findAllDeductions(employeeId?: string): Promise<import("./entities/salary-deduction.entity").SalaryDeduction[]>;
    createDeduction(data: any): Promise<import("./entities/salary-deduction.entity").SalaryDeduction[]>;
    approveDeduction(id: string, req: any): Promise<import("./entities/salary-deduction.entity").SalaryDeduction>;
    createOnCall(data: any): Promise<import("./entities/on-call-duty.entity").OnCallDuty>;
    findOnCall(employeeId?: string): Promise<import("./entities/on-call-duty.entity").OnCallDuty[]>;
    createBonus(data: any): Promise<import("./entities/performance-bonus.entity").PerformanceBonus>;
    findBonuses(employeeId?: string): Promise<import("./entities/performance-bonus.entity").PerformanceBonus[]>;
}
