import { AccountingService } from './accounting.service';
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    findAllMappings(): Promise<import("./entities/accounting-mapping.entity").AccountingMapping[]>;
    createMapping(data: any): Promise<import("./entities/accounting-mapping.entity").AccountingMapping>;
    updateMapping(id: string, data: any): Promise<import("./entities/accounting-mapping.entity").AccountingMapping>;
    generateJournal(month: number, year: number, establishmentId?: string): Promise<any[]>;
    getConsolidation(month: number, year: number): Promise<unknown[]>;
    export(res: any, month: number, year: number, format?: 'sage' | 'ebp' | 'generic', establishmentId?: string): Promise<any>;
}
