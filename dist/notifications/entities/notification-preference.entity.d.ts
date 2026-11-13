import { User } from '../../users/entities/user.entity';
export declare class NotificationPreference {
    id: string;
    userId: string;
    user: User;
    category: string;
    inApp: boolean;
    email: boolean;
    createdAt: Date;
    updatedAt: Date;
}
