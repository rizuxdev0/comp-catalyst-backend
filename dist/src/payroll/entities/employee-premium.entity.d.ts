import { Employee } from '../../employees/entities/employee.entity';
import { PremiumType } from './premium-type.entity';
export declare class EmployeePremium {
    id: string;
    employeeId: string;
    employee: Employee;
    premiumTypeId: string;
    premiumType: PremiumType;
    amount: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
