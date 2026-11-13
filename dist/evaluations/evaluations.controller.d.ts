import { EvaluationsService } from './evaluations.service';
export declare class EvaluationsController {
    private readonly service;
    constructor(service: EvaluationsService);
    findAll(): Promise<import("./entities/evaluation.entity").Evaluation[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/evaluation.entity").Evaluation[]>;
    findOne(id: string): Promise<import("./entities/evaluation.entity").Evaluation>;
    create(data: any): Promise<import("./entities/evaluation.entity").Evaluation>;
    update(id: string, data: any): Promise<import("./entities/evaluation.entity").Evaluation>;
    complete(id: string, body: {
        overall_rating: number;
    }): Promise<import("./entities/evaluation.entity").Evaluation>;
    remove(id: string): Promise<void>;
}
