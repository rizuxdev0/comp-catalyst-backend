import { OnboardingService } from './onboarding.service';
export declare class OnboardingController {
    private readonly service;
    constructor(service: OnboardingService);
    findAll(): Promise<import("./entities/onboarding.entity").OnboardingChecklist[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/onboarding.entity").OnboardingChecklist[]>;
    findOne(id: string): Promise<import("./entities/onboarding.entity").OnboardingChecklist>;
    createChecklist(data: any, req: any): Promise<import("./entities/onboarding.entity").OnboardingChecklist>;
    updateChecklist(id: string, data: any): Promise<import("./entities/onboarding.entity").OnboardingChecklist>;
    removeChecklist(id: string): Promise<void>;
    findAllTasks(checklistId?: string): Promise<import("./entities/onboarding.entity").OnboardingTask[]>;
    createTask(data: any): Promise<import("./entities/onboarding.entity").OnboardingTask>;
    findTasks(checklistId: string): Promise<import("./entities/onboarding.entity").OnboardingTask[]>;
    createTaskInChecklist(checklistId: string, data: any): Promise<import("./entities/onboarding.entity").OnboardingTask>;
    updateTask(id: string, data: any): Promise<import("./entities/onboarding.entity").OnboardingTask>;
    completeTask(id: string, req: any): Promise<import("./entities/onboarding.entity").OnboardingTask>;
    removeTask(id: string): Promise<void>;
    findAllEmployeeOnboarding(employeeId?: string): Promise<import("./entities/onboarding.entity").OnboardingChecklist[]>;
    updateEmployeeOnboarding(id: string, data: any): Promise<import("./entities/onboarding.entity").OnboardingTask>;
    startOnboarding(data: any): Promise<import("./entities/onboarding.entity").OnboardingChecklist>;
}
