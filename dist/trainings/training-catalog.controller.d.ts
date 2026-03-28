import { TrainingCatalogService } from './training-catalog.service';
export declare class TrainingCatalogController {
    private readonly svc;
    constructor(svc: TrainingCatalogService);
    getCatalog(): Promise<import("./entities/training-catalog.entity").TrainingCatalogItem[]>;
    createCatalog(data: any): Promise<import("./entities/training-catalog.entity").TrainingCatalogItem>;
    updateCatalog(id: string, data: any): Promise<import("./entities/training-catalog.entity").TrainingCatalogItem>;
    deleteCatalog(id: string): Promise<import("typeorm").DeleteResult>;
    getSkills(): Promise<import("./entities/training-catalog.entity").Skill[]>;
    createSkill(data: any): Promise<import("./entities/training-catalog.entity").Skill>;
    updateSkill(id: string, data: any): Promise<import("./entities/training-catalog.entity").Skill>;
    deleteSkill(id: string): Promise<import("typeorm").DeleteResult>;
    getCertifications(): Promise<import("./entities/training-catalog.entity").Certification[]>;
    createCertification(data: any): Promise<import("./entities/training-catalog.entity").Certification>;
    updateCertification(id: string, data: any): Promise<import("./entities/training-catalog.entity").Certification>;
    deleteCertification(id: string): Promise<import("typeorm").DeleteResult>;
    getEmployeeSkills(): Promise<import("./entities/training-catalog.entity").EmployeeSkill[]>;
    createEmployeeSkill(data: any): Promise<import("./entities/training-catalog.entity").EmployeeSkill>;
    getEmployeeCertifications(): Promise<import("./entities/training-catalog.entity").EmployeeCertification[]>;
    createEmployeeCertification(data: any): Promise<import("./entities/training-catalog.entity").EmployeeCertification>;
    getDevelopmentPlans(): Promise<import("./entities/training-catalog.entity").DevelopmentPlan[]>;
    createDevelopmentPlan(data: any): Promise<import("./entities/training-catalog.entity").DevelopmentPlan>;
    getTrainingEvaluations(): Promise<import("./entities/training-catalog.entity").TrainingEvaluation[]>;
    createTrainingEvaluation(data: any): Promise<import("./entities/training-catalog.entity").TrainingEvaluation>;
}
