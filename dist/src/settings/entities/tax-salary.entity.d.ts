export declare class CountryTaxSetting {
    id: string;
    country_name: string;
    country_code: string;
    currency_code: string;
    currency_symbol: string;
    income_tax_brackets: any[];
    social_contributions: any[];
    employer_charges: any[];
    vat_rate: number;
    fiscal_year_start_month: number;
    tax_rules: any;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare class SalaryGridItem {
    id: string;
    category: string;
    echelon: string;
    education_level: string;
    base_index: number;
    index_value: number;
    min_salary: number;
    max_salary: number;
    hourly_rate: number;
    description: string;
    class: string;
    seniority_bonus_rate: number;
    performance_bonus_rate: number;
    transport_allowance: number;
    housing_allowance: number;
    employer_charges_rate: number;
    employee_charges_rate: number;
    total_gross: number;
    net_salary: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
