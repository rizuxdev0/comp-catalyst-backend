import { Repository } from 'typeorm';
import { CountryTaxSetting, SalaryGridItem } from './entities/tax-salary.entity';
export declare class TaxSalaryService {
    private taxRepo;
    private salaryRepo;
    constructor(taxRepo: Repository<CountryTaxSetting>, salaryRepo: Repository<SalaryGridItem>);
    findAllTaxSettings(): Promise<CountryTaxSetting[]>;
    createTaxSetting(data: Partial<CountryTaxSetting>): Promise<CountryTaxSetting>;
    updateTaxSetting(id: string, data: Partial<CountryTaxSetting>): Promise<CountryTaxSetting>;
    deleteTaxSetting(id: string): Promise<import("typeorm").DeleteResult>;
    findAllSalaryGrid(): Promise<SalaryGridItem[]>;
    createSalaryGrid(data: Partial<SalaryGridItem>): Promise<SalaryGridItem>;
    updateSalaryGrid(id: string, data: Partial<SalaryGridItem>): Promise<SalaryGridItem>;
    deleteSalaryGrid(id: string): Promise<import("typeorm").DeleteResult>;
}
