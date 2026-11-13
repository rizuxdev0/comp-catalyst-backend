import { Employee } from '../../employees/entities/employee.entity';
export declare class Departure {
    id: string;
    employee_id: string;
    employee: Employee;
    departure_type: string;
    notice_date: string;
    last_working_day: string;
    effective_departure_date: string | null;
    reason: string | null;
    severance_amount: number | null;
    leave_payout: number | null;
    status: string;
    exit_interview_done: boolean;
    exit_interview_notes: string | null;
    equipment_returned: boolean;
    access_revoked: boolean;
    document_url: string | null;
    notes: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
