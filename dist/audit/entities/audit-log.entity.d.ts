import { User } from '../../users/entities/user.entity';
export declare class AuditLog {
    id: string;
    userId: string;
    user: User;
    action: string;
    entityType: string;
    entityId: string;
    entityName: string;
    oldValues: any;
    newValues: any;
    metadata: any;
    createdAt: Date;
}
