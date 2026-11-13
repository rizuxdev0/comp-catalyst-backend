import { Employee } from '../../employees/entities/employee.entity';
export declare enum PaySlipStatus {
    DRAFT = "draft",
    VALIDATED = "validated",
    PAID = "paid",
    CANCELLED = "cancelled"
}
export declare class PaySlip {
    id: string;
    employeeId: string;
    employee: Employee;
    establishmentId: string;
    periodMonth: number;
    periodYear: number;
    baseSalary: number;
    grossSalary: number;
    netSalary: number;
    totalPremiums: number;
    totalDeductions: number;
    premiumsDetail: any[];
    deductionsDetail: any[];
    employerDetail: any[];
    status: PaySlipStatus;
    validatedBy: string;
    validatedAt: Date;
    paidAt: Date;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
