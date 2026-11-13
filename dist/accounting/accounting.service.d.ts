import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountingMapping } from './entities/accounting-mapping.entity';
import { PaySlip } from '../payroll/entities/payslip.entity';
export declare class AccountingService implements OnModuleInit {
    private mappingRepository;
    private payslipRepository;
    constructor(mappingRepository: Repository<AccountingMapping>, payslipRepository: Repository<PaySlip>);
    onModuleInit(): Promise<void>;
    findAllMappings(): Promise<AccountingMapping[]>;
    createMapping(data: Partial<AccountingMapping>): Promise<AccountingMapping>;
    updateMapping(id: string, data: Partial<AccountingMapping>): Promise<AccountingMapping>;
    generateJournalEntries(month: number, year: number, establishmentId?: string): Promise<any[]>;
    getConsolidatedReport(month: number, year: number): Promise<unknown[]>;
    exportToCSV(month: number, year: number, format?: 'sage' | 'ebp' | 'generic', establishmentId?: string): Promise<string>;
}
