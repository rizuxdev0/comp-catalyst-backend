import { Employee } from '../../employees/entities/employee.entity';
export declare class Evaluation {
    id: string;
    employee_id: string;
    employee: Employee;
    evaluator_id: string | null;
    evaluator: Employee;
    evaluation_type: string;
    period: string | null;
    status: string;
    overall_rating: number | null;
    objectives: any;
    strengths: string | null;
    areas_of_improvement: string | null;
    comments: string | null;
    employee_comments: string | null;
    action_plan: string | null;
    evaluation_date: string | null;
    next_evaluation_date: string | null;
    created_at: Date;
    updated_at: Date;
}
