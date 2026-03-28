import { Employee } from '../../employees/entities/employee.entity';
import { ContractType } from './contract-type.entity';
export declare enum ContractStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    SUSPENDED = "suspended",
    TERMINATED = "terminated",
    EXPIRED = "expired"
}
export declare class Contract {
    id: string;
    contractNumber: string;
    employeeId: string;
    employee: Employee;
    contractTypeId: string;
    contractType: ContractType;
    status: ContractStatus;
    jobTitle: string;
    startDate: Date;
    endDate: Date;
    baseSalary: number;
    workingHoursPerWeek: number;
    isRenewable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
