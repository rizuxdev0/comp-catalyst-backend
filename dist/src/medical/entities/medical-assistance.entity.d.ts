import { Employee } from '../../employees/entities/employee.entity';
export declare class MedicalAssistance {
    id: string;
    employee_id: string;
    employee: Employee;
    type: string;
    request_date: string;
    description: string;
    amount_requested: number | null;
    amount_approved: number | null;
    status: string;
    approved_by: string | null;
    approved_at: Date | null;
    rejection_reason: string | null;
    document_url: string | null;
    notes: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
