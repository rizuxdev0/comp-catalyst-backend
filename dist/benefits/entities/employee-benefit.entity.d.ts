import { Employee } from '../../employees/entities/employee.entity';
export declare class EmployeeBenefit {
    id: string;
    employee_id: string;
    employee: Employee;
    benefit_type: string;
    provider: string | null;
    employer_contribution: number | null;
    employee_contribution: number | null;
    total_value: number | null;
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
    description: string | null;
    notes: string | null;
    created_at: Date;
    updated_at: Date;
}
