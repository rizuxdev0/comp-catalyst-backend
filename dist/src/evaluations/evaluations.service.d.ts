import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
export declare class EvaluationsService {
    private repo;
    constructor(repo: Repository<Evaluation>);
    findAll(): Promise<Evaluation[]>;
    findOne(id: string): Promise<Evaluation>;
    findByEmployee(employeeId: string): Promise<Evaluation[]>;
    create(data: Partial<Evaluation>): Promise<Evaluation>;
    update(id: string, data: Partial<Evaluation>): Promise<Evaluation>;
    complete(id: string, rating: number): Promise<Evaluation>;
    remove(id: string): Promise<void>;
}
