import { EmployeeSurveysService } from './employee-surveys.service';
export declare class EmployeeSurveysController {
    private readonly svc;
    constructor(svc: EmployeeSurveysService);
    getSurveys(): Promise<import("./entities/employee-survey.entity").EmployeeSurvey[]>;
    createSurvey(data: any): Promise<import("./entities/employee-survey.entity").EmployeeSurvey>;
    updateSurvey(id: string, data: any): Promise<import("./entities/employee-survey.entity").EmployeeSurvey>;
    getSuggestions(): Promise<import("./entities/employee-survey.entity").SuggestionBoxItem[]>;
    createSuggestion(data: any): Promise<import("./entities/employee-survey.entity").SuggestionBoxItem>;
    updateSuggestion(id: string, data: any): Promise<import("./entities/employee-survey.entity").SuggestionBoxItem>;
    vote(data: {
        suggestion_id: string;
        user_id?: string;
        vote_type: string;
    }, req: any): Promise<{
        message: string;
    }>;
    getResponses(): Promise<import("./entities/employee-survey.entity").SurveyResponseEntity[]>;
    createResponse(data: any): Promise<import("./entities/employee-survey.entity").SurveyResponseEntity>;
}
