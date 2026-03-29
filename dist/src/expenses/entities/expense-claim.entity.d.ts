import { Employee } from '../../employees/entities/employee.entity';
export declare class ExpenseClaim {
    id: string;
    employeeId: string;
    employee: Employee;
    type: string;
    amount: number;
    currency: string;
    expenseDate: Date;
    description: string;
    receiptUrl: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
