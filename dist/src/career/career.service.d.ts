import { Repository } from 'typeorm';
import { CareerHistory } from './entities/career-history.entity';
import { AuditService } from '../audit/audit.service';
export declare class CareerService {
    private repo;
    private auditService;
    constructor(repo: Repository<CareerHistory>, auditService: AuditService);
    findByEmployee(employeeId: string): Promise<CareerHistory[]>;
    findAll(): Promise<CareerHistory[]>;
    findOne(id: string): Promise<CareerHistory>;
    create(data: Partial<CareerHistory>): Promise<CareerHistory>;
    update(id: string, data: Partial<CareerHistory>): Promise<CareerHistory>;
    remove(id: string): Promise<void>;
}
