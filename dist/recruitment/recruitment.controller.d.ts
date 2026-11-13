import { RecruitmentService } from './recruitment.service';
import { JobApplication } from './entities/job-application.entity';
import { TalentPool } from './entities/talent-pool.entity';
import { CandidateEvaluation } from './entities/candidate-evaluation.entity';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    findAllPostings(): Promise<import("./entities/job-posting.entity").JobPosting[]>;
    findOnePosting(id: string): Promise<import("./entities/job-posting.entity").JobPosting>;
    createPosting(data: any): Promise<import("./entities/job-posting.entity").JobPosting>;
    updatePosting(id: string, data: any): Promise<import("./entities/job-posting.entity").JobPosting>;
    removePosting(id: string): Promise<void>;
    publishToJobBoards(id: string, platforms: string[]): Promise<any>;
    findAllApplications(postingId?: string): Promise<JobApplication[]>;
    findOneApplication(id: string): Promise<JobApplication>;
    createApplication(data: any): Promise<JobApplication>;
    updateApplicationStatus(id: string, status: string, notes?: string): Promise<JobApplication>;
    sendApplicationEmail(id: string, subject: string, body: string): Promise<any>;
    findAllTalent(): Promise<TalentPool[]>;
    findOneTalent(id: string): Promise<TalentPool>;
    createTalent(data: any): Promise<TalentPool>;
    updateTalent(id: string, data: any): Promise<TalentPool>;
    removeTalent(id: string): Promise<void>;
    findAllEvaluations(): Promise<CandidateEvaluation[]>;
    createEvaluation(data: any): Promise<CandidateEvaluation>;
    analyzeCV(text: string, title?: string): Promise<any>;
}
