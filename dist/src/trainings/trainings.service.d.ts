import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { TrainingEnrollment } from './entities/training-enrollment.entity';
import { TrainingBudget } from './entities/training-budget.entity';
export declare class TrainingsService {
    private trainingRepository;
    private enrollmentRepository;
    private budgetRepository;
    constructor(trainingRepository: Repository<Training>, enrollmentRepository: Repository<TrainingEnrollment>, budgetRepository: Repository<TrainingBudget>);
    findAllTrainings(): Promise<Training[]>;
    findOneTraining(id: string): Promise<Training>;
    createTraining(data: Partial<Training>): Promise<Training>;
    updateTraining(id: string, data: any): Promise<Training>;
    findAllEnrollments(): Promise<TrainingEnrollment[]>;
    enrollEmployees(trainingId: string, employeeIds: string[]): Promise<TrainingEnrollment[]>;
    completeEnrollment(id: string, certificationUrl?: string): Promise<TrainingEnrollment>;
    cancelEnrollment(id: string): Promise<void>;
    findBudgets(): Promise<TrainingBudget[]>;
}
