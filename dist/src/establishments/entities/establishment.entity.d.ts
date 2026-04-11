import { CompanySettings } from '../../settings/entities/company-settings.entity';
import { Employee } from '../../employees/entities/employee.entity';
export declare class Establishment {
    id: string;
    name: string;
    code_ape: string;
    sector: string;
    registration_number: string;
    tax_id: string;
    address_line1: string;
    city: string;
    postal_code: string;
    is_main: boolean;
    company_id: string;
    company: CompanySettings;
    employees: Employee[];
    created_at: Date;
    updated_at: Date;
}
