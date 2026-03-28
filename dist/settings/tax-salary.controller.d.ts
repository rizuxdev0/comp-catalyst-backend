import { TaxSalaryService } from './tax-salary.service';
export declare class TaxSalaryController {
    private readonly svc;
    constructor(svc: TaxSalaryService);
    getTaxSettings(): Promise<import("./entities/tax-salary.entity").CountryTaxSetting[]>;
    createTaxSetting(data: any): Promise<import("./entities/tax-salary.entity").CountryTaxSetting>;
    updateTaxSetting(id: string, data: any): Promise<import("./entities/tax-salary.entity").CountryTaxSetting>;
    deleteTaxSetting(id: string): Promise<import("typeorm").DeleteResult>;
    getSalaryGrid(): Promise<import("./entities/tax-salary.entity").SalaryGridItem[]>;
    createSalaryGrid(data: any): Promise<import("./entities/tax-salary.entity").SalaryGridItem>;
    updateSalaryGrid(id: string, data: any): Promise<import("./entities/tax-salary.entity").SalaryGridItem>;
    deleteSalaryGrid(id: string): Promise<import("typeorm").DeleteResult>;
}
