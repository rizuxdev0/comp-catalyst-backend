import { Employee } from '../../employees/entities/employee.entity';
export declare class PerformanceBonus {
    id: string;
    employeeId: string;
    employee: Employee;
    title: string;
    criteria: string;
    achievementPercentage: number;
    baseAmount: number;
    finalAmount: number;
    period: string;
    isPaid: boolean;
    createdAt: Date;
    updatedAt: Date;
}
