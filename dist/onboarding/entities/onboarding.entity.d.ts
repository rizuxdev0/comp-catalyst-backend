import { Employee } from '../../employees/entities/employee.entity';
export declare class OnboardingChecklist {
    id: string;
    employee_id: string;
    employee: Employee;
    title: string;
    description: string | null;
    start_date: string | null;
    target_completion_date: string | null;
    status: string;
    progress_percentage: number;
    assigned_to: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare class OnboardingTask {
    id: string;
    checklist_id: string;
    checklist: OnboardingChecklist;
    title: string;
    description: string | null;
    category: string;
    sort_order: number;
    is_completed: boolean;
    completed_at: Date | null;
    completed_by: string | null;
    due_date: string | null;
    is_required: boolean;
    notes: string | null;
    created_at: Date;
    updated_at: Date;
}
