import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../departments/entities/department.entity';
export declare class HolidayPlan {
    id: string;
    employeeId: string;
    employee: Employee;
    departmentId: string;
    department: Department;
    startDate: Date;
    endDate: Date;
    status: string;
    notes: string;
    approvedBy: string;
    approvedAt: Date;
    rejectionReason: string;
    createdAt: Date;
    updatedAt: Date;
}
