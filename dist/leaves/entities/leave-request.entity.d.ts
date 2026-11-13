import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from './leave-type.entity';
export declare enum LeaveRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare class LeaveRequest {
    id: string;
    employeeId: string;
    employee: Employee;
    leaveTypeId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    daysCount: number;
    reason: string;
    status: LeaveRequestStatus;
    approvedBy: string;
    approvedAt: Date;
    rejectionReason: string;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
