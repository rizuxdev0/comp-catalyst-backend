import { Repository } from 'typeorm';
import { EmployeeSurvey, SuggestionBoxItem, SuggestionVote, SurveyResponseEntity } from './entities/employee-survey.entity';
export declare class EmployeeSurveysService {
    private surveyRepo;
    private suggestionRepo;
    private voteRepo;
    private responseRepo;
    constructor(surveyRepo: Repository<EmployeeSurvey>, suggestionRepo: Repository<SuggestionBoxItem>, voteRepo: Repository<SuggestionVote>, responseRepo: Repository<SurveyResponseEntity>);
    findAllSurveys(): Promise<EmployeeSurvey[]>;
    createSurvey(data: Partial<EmployeeSurvey>): Promise<EmployeeSurvey>;
    updateSurvey(id: string, data: Partial<EmployeeSurvey>): Promise<EmployeeSurvey>;
    findAllSuggestions(): Promise<SuggestionBoxItem[]>;
    createSuggestion(data: Partial<SuggestionBoxItem>): Promise<SuggestionBoxItem>;
    updateSuggestion(id: string, data: Partial<SuggestionBoxItem>): Promise<SuggestionBoxItem>;
    voteOnSuggestion(suggestion_id: string, user_id: string, vote_type: string): Promise<{
        message: string;
    }>;
    findAllResponses(): Promise<SurveyResponseEntity[]>;
    createResponse(data: Partial<SurveyResponseEntity>): Promise<SurveyResponseEntity>;
}
