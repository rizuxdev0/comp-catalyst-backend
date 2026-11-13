import { AuditService } from './audit.service';
import { AuditLog } from './entities/audit-log.entity';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(entityType?: string, userId?: string): Promise<{
        id: string;
        userEmail: string;
        userName: string;
        action: string;
        entityType: string;
        entityId: string;
        entityName: string;
        previousValues: any;
        newValues: any;
        ipAddress: string;
        userAgent: string;
        createdAt: Date;
    }[]>;
    create(logData: Partial<AuditLog>, req: any): Promise<AuditLog>;
    exportReport(type: string): Promise<{
        report_url: string;
        generated_at: Date;
        status: string;
    }>;
}
