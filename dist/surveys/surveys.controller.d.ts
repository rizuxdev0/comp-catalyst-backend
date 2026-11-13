import { SurveysService } from './surveys.service';
export declare class SurveysController {
    private readonly service;
    constructor(service: SurveysService);
    findAll(): Promise<import("./entities/survey.entity").Survey[]>;
    findOne(id: string): Promise<import("./entities/survey.entity").Survey>;
    getStats(id: string): Promise<{
        survey: import("./entities/survey.entity").Survey;
        total_responses: number;
        responses: import("./entities/survey.entity").SurveyResponse[];
    }>;
    getResponses(id: string): Promise<import("./entities/survey.entity").SurveyResponse[]>;
    create(data: any, req: any): Promise<import("./entities/survey.entity").Survey>;
    update(id: string, data: any): Promise<import("./entities/survey.entity").Survey>;
    activate(id: string): Promise<import("./entities/survey.entity").Survey>;
    close(id: string): Promise<import("./entities/survey.entity").Survey>;
    respond(id: string, data: any, req: any): Promise<import("./entities/survey.entity").SurveyResponse>;
    remove(id: string): Promise<void>;
}
