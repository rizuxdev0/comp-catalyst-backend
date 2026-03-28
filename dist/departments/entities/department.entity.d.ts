import { Employee } from '../../employees/entities/employee.entity';
export declare class Department {
    id: string;
    code: string;
    name: string;
    description: string;
    managerId: string;
    manager: Employee;
    parentDepartmentId: string;
    parent: Department;
    children: Department[];
    employees: Employee[];
    budget: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
