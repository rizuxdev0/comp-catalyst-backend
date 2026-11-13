export declare class Survey {
    id: string;
    title: string;
    description: string | null;
    type: string;
    questions: any[];
    status: string;
    start_date: string | null;
    end_date: string | null;
    is_anonymous: boolean;
    target_audience: string;
    target_department_id: string | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare class SurveyResponse {
    id: string;
    survey_id: string;
    respondent_id: string | null;
    answers: any[];
    suggestion_text: string | null;
    rating: number | null;
    submitted_at: Date;
}
