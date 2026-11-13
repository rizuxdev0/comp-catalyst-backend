import { Repository } from 'typeorm';
import { OnboardingChecklist, OnboardingTask } from './entities/onboarding.entity';
export declare class OnboardingService {
    private checklistRepo;
    private taskRepo;
    constructor(checklistRepo: Repository<OnboardingChecklist>, taskRepo: Repository<OnboardingTask>);
    findAllChecklists(): Promise<OnboardingChecklist[]>;
    findChecklist(id: string): Promise<OnboardingChecklist>;
    findByEmployee(employeeId: string): Promise<OnboardingChecklist[]>;
    createChecklist(data: Partial<OnboardingChecklist>): Promise<OnboardingChecklist>;
    updateChecklist(id: string, data: Partial<OnboardingChecklist>): Promise<OnboardingChecklist>;
    removeChecklist(id: string): Promise<void>;
    findAllTasks(): Promise<OnboardingTask[]>;
    findTasksByChecklist(checklistId: string): Promise<OnboardingTask[]>;
    findAllEmployeeOnboarding(): Promise<OnboardingChecklist[]>;
    startOnboarding(data: {
        employee_id: string;
        title?: string;
    }): Promise<OnboardingChecklist>;
    createTask(data: Partial<OnboardingTask>): Promise<OnboardingTask>;
    completeTask(id: string, userId: string): Promise<OnboardingTask>;
    updateTask(id: string, data: Partial<OnboardingTask>): Promise<OnboardingTask>;
    removeTask(id: string): Promise<void>;
}
