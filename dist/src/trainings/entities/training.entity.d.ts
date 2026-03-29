import { TrainingEnrollment } from './training-enrollment.entity';
export declare class Training {
    id: string;
    title: string;
    description: string;
    trainer: string;
    startDate: Date;
    endDate: Date;
    location: string;
    maxParticipants: number;
    status: string;
    enrollments: TrainingEnrollment[];
    createdAt: Date;
    updatedAt: Date;
}
