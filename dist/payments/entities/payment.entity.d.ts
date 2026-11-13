import { Employee } from '../../employees/entities/employee.entity';
export declare enum PaymentMethod {
    BANK_TRANSFER = "bank_transfer",
    CHECK = "check",
    CASH = "cash",
    MOBILE_MONEY = "mobile_money"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare class Payment {
    id: string;
    payslipId: string;
    employeeId: string;
    employee: Employee;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentDate: Date;
    status: PaymentStatus;
    transactionId: string;
    bankReference: string;
    notes: string;
    processedBy: string;
    processedAt: Date;
    failureReason: string;
    retryCount: number;
    periodMonth: number;
    periodYear: number;
    createdAt: Date;
    updatedAt: Date;
}
