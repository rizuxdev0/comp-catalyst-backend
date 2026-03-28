import { Employee } from '../../employees/entities/employee.entity';
export declare class WorkAccident {
    id: string;
    employee_id: string;
    employee: Employee;
    accident_date: string;
    accident_time: string | null;
    location: string;
    description: string;
    severity: string | null;
    injury_type: string | null;
    body_parts_affected: string[];
    witnesses: string[];
    status: string;
    work_days_lost: number;
    medical_leave_start: string | null;
    medical_leave_end: string | null;
    declaration_number: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
