export declare class TrainingCatalogItem {
    id: string;
    code: string;
    name: string;
    category: string;
    description: string;
    duration_hours: number;
    cost_per_participant: number;
    provider: string;
    certification_available: boolean;
    certification_name: string;
    skills_covered: string[];
    prerequisites: string;
    target_audience: string;
    delivery_mode: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare class Skill {
    id: string;
    code: string;
    name: string;
    category: string;
    description: string;
    level_scale: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare class Certification {
    id: string;
    code: string;
    name: string;
    issuing_body: string;
    validity_months: number;
    description: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare class EmployeeSkill {
    id: string;
    employee_id: string;
    skill_id: string;
    current_level: number;
    target_level: number;
    assessed_at: Date;
    notes: string;
    created_at: Date;
    updated_at: Date;
}
export declare class EmployeeCertification {
    id: string;
    employee_id: string;
    certification_id: string;
    obtained_date: string;
    expiry_date: string;
    certificate_url: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export declare class DevelopmentPlan {
    id: string;
    employee_id: string;
    title: string;
    description: string;
    start_date: string;
    target_date: string;
    status: string;
    objectives: any[];
    progress_percentage: number;
    created_at: Date;
    updated_at: Date;
}
export declare class TrainingEvaluation {
    id: string;
    training_id: string;
    employee_id: string;
    score: number;
    feedback: string;
    evaluated_at: Date;
    created_at: Date;
}
