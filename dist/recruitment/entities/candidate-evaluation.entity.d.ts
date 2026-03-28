import { JobApplication } from './job-application.entity';
export declare class CandidateEvaluation {
    id: string;
    applicationId: string;
    application: JobApplication;
    evaluatorName: string;
    evaluatorEmail: string;
    criteria: any[];
    overallScore: number;
    overallComment: string;
    recommendation: string;
    evaluatedAt: Date;
}
