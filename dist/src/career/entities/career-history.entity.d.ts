import { Employee } from '../../employees/entities/employee.entity';
export declare class CareerHistory {
    id: string;
    employee_id: string;
    employee: Employee;
    event_type: string;
    event_date: string;
    effective_date: string;
    previous_job_title: string | null;
    new_job_title: string | null;
    previous_department: string | null;
    new_department: string | null;
    previous_salary: number | null;
    new_salary: number | null;
    previous_value: any;
    new_value: any;
    reason: string | null;
    notes: string | null;
    document_url: string | null;
    previous_contract_id: string | null;
    new_contract_id: string | null;
    approved_by: string | null;
    approved_at: Date | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
