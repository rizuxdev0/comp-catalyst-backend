import { JobApplication } from './job-application.entity';
export declare enum RecruitmentStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
export declare class JobPosting {
    id: string;
    title: string;
    department: string;
    description: string;
    requirements: string;
    salaryRange: string;
    location: string;
    contractType: string;
    status: RecruitmentStatus;
    applications: JobApplication[];
    createdAt: Date;
    updatedAt: Date;
}
