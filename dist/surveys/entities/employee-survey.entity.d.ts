export declare class EmployeeSurvey {
    id: string;
    title: string;
    description: string;
    type: string;
    questions: any[];
    status: string;
    start_date: string;
    end_date: string;
    is_anonymous: boolean;
    target_audience: string;
    target_department_id: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}
export declare class SuggestionBoxItem {
    id: string;
    employee_id: string;
    title: string;
    content: string;
    category: string;
    status: string;
    is_anonymous: boolean;
    votes_count: number;
    admin_response: string;
    responded_by: string;
    responded_at: Date;
    created_at: Date;
    updated_at: Date;
}
export declare class SuggestionVote {
    id: string;
    suggestion_id: string;
    user_id: string;
    vote_type: string;
    created_at: Date;
}
export declare class SurveyResponseEntity {
    id: string;
    survey_id: string;
    respondent_id: string;
    answers: any[];
    suggestion_text: string;
    rating: number;
    submitted_at: Date;
}
