import { Employee } from '../../employees/entities/employee.entity';
export declare class AttendanceRecord {
    id: string;
    employeeId: string;
    employee: Employee;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    hoursWorked: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
