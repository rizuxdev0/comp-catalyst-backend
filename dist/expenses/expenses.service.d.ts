import { Repository } from 'typeorm';
import { ExpenseClaim } from './entities/expense-claim.entity';
export declare class ExpensesService {
    private expenseRepository;
    constructor(expenseRepository: Repository<ExpenseClaim>);
    findAll(): Promise<ExpenseClaim[]>;
    findOne(id: string): Promise<ExpenseClaim>;
    create(data: Partial<ExpenseClaim>): Promise<ExpenseClaim>;
    update(id: string, data: Partial<ExpenseClaim>): Promise<ExpenseClaim>;
    remove(id: string): Promise<void>;
    findByEmployee(employeeId: string): Promise<ExpenseClaim[]>;
}
