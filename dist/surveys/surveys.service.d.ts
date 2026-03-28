import { Repository } from 'typeorm';
import { Survey, SurveyResponse } from './entities/survey.entity';
export declare class SurveysService {
    private surveyRepo;
    private responseRepo;
    constructor(surveyRepo: Repository<Survey>, responseRepo: Repository<SurveyResponse>);
    findAll(): Promise<Survey[]>;
    findOne(id: string): Promise<Survey>;
    create(data: Partial<Survey>): Promise<Survey>;
    update(id: string, data: Partial<Survey>): Promise<Survey>;
    activate(id: string): Promise<Survey>;
    close(id: string): Promise<Survey>;
    remove(id: string): Promise<void>;
    getResponses(surveyId: string): Promise<SurveyResponse[]>;
    submitResponse(surveyId: string, data: Partial<SurveyResponse>): Promise<SurveyResponse>;
    getStats(surveyId: string): Promise<{
        survey: Survey;
        total_responses: number;
        responses: SurveyResponse[];
    }>;
}
