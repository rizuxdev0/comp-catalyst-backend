import { User } from './user.entity';
import { Permission } from './permission.entity';
export declare class UserExtraPermission {
    id: string;
    userId: string;
    user: User;
    permissionId: string;
    permission: Permission;
    expiresAt: Date;
    createdAt: Date;
}
