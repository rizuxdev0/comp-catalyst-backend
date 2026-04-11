import { Employee } from '../../employees/entities/employee.entity';
export declare enum OnCallType {
    NIGHT = "night",
    WEEKEND = "weekend",
    HOLIDAY = "holiday",
    GENERAL = "general"
}
export declare class OnCallDuty {
    id: string;
    employeeId: string;
    employee: Employee;
    date: string;
    type: OnCallType;
    hours: number;
    amount: number;
    isPaid: boolean;
    payslipId: string;
    createdAt: Date;
    updatedAt: Date;
}
