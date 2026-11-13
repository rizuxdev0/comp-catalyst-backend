import { TrainingsService } from './trainings.service';
export declare class TrainingsController {
    private readonly trainingsService;
    constructor(trainingsService: TrainingsService);
    getTrainings(): Promise<import("./entities/training.entity").Training[]>;
    createTraining(data: any): Promise<import("./entities/training.entity").Training>;
    updateTraining(id: string, data: any): Promise<import("./entities/training.entity").Training>;
    getEnrollments(): Promise<import("./entities/training-enrollment.entity").TrainingEnrollment[]>;
    enrollEmployees(id: string, employeeIds: string[]): Promise<import("./entities/training-enrollment.entity").TrainingEnrollment[]>;
    completeEnrollment(id: string, certificationUrl?: string): Promise<import("./entities/training-enrollment.entity").TrainingEnrollment>;
    cancelEnrollment(id: string): Promise<void>;
    getBudgets(): Promise<import("./entities/training-budget.entity").TrainingBudget[]>;
}
