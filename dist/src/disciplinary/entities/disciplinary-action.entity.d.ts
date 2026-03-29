import { Employee } from '../../employees/entities/employee.entity';
export declare class DisciplinaryAction {
    id: string;
    employee_id: string;
    employee: Employee;
    type: string;
    severity: string;
    incident_date: string;
    description: string;
    decision: string | null;
    decision_date: string | null;
    status: string;
    suspension_days: number | null;
    salary_impact: number | null;
    evidence_url: string | null;
    notes: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
