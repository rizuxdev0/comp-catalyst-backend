import { Employee } from '../../employees/entities/employee.entity';
export declare class Vehicle {
    id: string;
    make: string;
    model: string;
    registrationNumber: string;
    chassisNumber: string;
    type: string;
    color: string;
    manufactureYear: number;
    status: string;
    currentEmployeeId: string;
    currentEmployee: Employee;
    assignmentDate: Date;
    insuranceExpiry: Date;
    lastMaintenance: Date;
    createdAt: Date;
    updatedAt: Date;
}
