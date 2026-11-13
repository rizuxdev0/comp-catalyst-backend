import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from './leave-type.entity';
export declare class LeaveBalance {
    id: string;
    employeeId: string;
    employee: Employee;
    leaveTypeId: string;
    leaveType: LeaveType;
    year: number;
    entitledDays: number;
    takenDays: number;
    pendingDays: number;
    carriedOverDays: number;
    createdAt: Date;
    updatedAt: Date;
}
