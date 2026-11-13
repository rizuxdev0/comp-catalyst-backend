import { JobPosting } from './job-posting.entity';
export declare enum ApplicationStatus {
    PENDING = "pending",
    SCREENING = "screening",
    INTERVIEW = "interview",
    TESTING = "testing",
    OFFER = "offer",
    HIRED = "hired",
    REJECTED = "rejected"
}
export declare class JobApplication {
    id: string;
    jobPostingId: string;
    jobPosting: JobPosting;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    status: string;
    notes: string;
    interviewDate: Date;
    score: number;
    cvUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
