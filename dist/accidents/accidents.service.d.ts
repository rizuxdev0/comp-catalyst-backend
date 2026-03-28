import { Repository } from 'typeorm';
import { WorkAccident } from './entities/work-accident.entity';
export declare class AccidentsService {
    private repo;
    constructor(repo: Repository<WorkAccident>);
    findAll(): Promise<WorkAccident[]>;
    findOne(id: string): Promise<WorkAccident>;
    findByEmployee(employeeId: string): Promise<WorkAccident[]>;
    create(data: Partial<WorkAccident>): Promise<WorkAccident>;
    update(id: string, data: Partial<WorkAccident>): Promise<WorkAccident>;
    remove(id: string): Promise<void>;
}
