import { InterviewsService } from './interviews.service';
export declare class InterviewsController {
    private readonly svc;
    constructor(svc: InterviewsService);
    getInterviews(): Promise<import("./entities/interview.entity").Interview[]>;
    createInterview(data: any, req: any): Promise<import("./entities/interview.entity").Interview>;
    updateInterview(id: string, data: any): Promise<import("./entities/interview.entity").Interview>;
    deleteInterview(id: string): Promise<import("typeorm").DeleteResult>;
}
