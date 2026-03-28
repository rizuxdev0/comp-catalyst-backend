import { Employee } from '../../employees/entities/employee.entity';
export declare enum DeductionType {
    ADVANCE = "advance",
    LOAN = "loan",
    GARNISHMENT = "garnishment",
    ABSENCE = "absence",
    EQUIPMENT = "equipment",
    PENALTY = "penalty",
    OTHER = "other"
}
export declare enum DeductionStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum ApprovalStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class SalaryDeduction {
    id: string;
    employeeId: string;
    employee: Employee;
    type: DeductionType;
    description: string;
    totalAmount: number;
    amountPerMonth: number;
    remainingAmount: number;
    startDate: Date;
    endDate: Date;
    installmentsCount: number;
    installmentsPaid: number;
    status: DeductionStatus;
    approvalStatus: ApprovalStatus;
    approvedBy: string;
    approvedAt: Date;
    rejectionReason: string;
    createdAt: Date;
    updatedAt: Date;
}
