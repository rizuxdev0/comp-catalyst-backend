import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(): Promise<import("./entities/expense-claim.entity").ExpenseClaim[]>;
    create(data: any): Promise<import("./entities/expense-claim.entity").ExpenseClaim>;
    update(id: string, data: any): Promise<import("./entities/expense-claim.entity").ExpenseClaim>;
    remove(id: string): Promise<void>;
    getMyClaims(req: any): Promise<import("./entities/expense-claim.entity").ExpenseClaim[]>;
}
