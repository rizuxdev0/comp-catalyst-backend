import { Employee } from '../../employees/entities/employee.entity';
export declare enum CareerChangeType {
    PROMOTION = "promotion",
    TRANSFER = "transfer",
    DEMOTION = "demotion",
    SALARY_INCREASE = "salary_increase",
    INITIAL_ASSIGNMENT = "initial_assignment",
    OTHER = "other"
}
export declare class CareerHistory {
    id: string;
    employeeId: string;
    employee: Employee;
    changeDate: Date;
    type: CareerChangeType;
    oldPosition: string;
    newPosition: string;
    oldDepartment: string;
    newDepartment: string;
    oldSalary: number;
    newSalary: number;
    notes: string;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
