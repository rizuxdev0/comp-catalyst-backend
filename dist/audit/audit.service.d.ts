import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
export declare class AuditService {
    private auditRepository;
    constructor(auditRepository: Repository<AuditLog>);
    log(data: Partial<AuditLog>): Promise<AuditLog>;
    findAll(filters: any): Promise<AuditLog[]>;
}
