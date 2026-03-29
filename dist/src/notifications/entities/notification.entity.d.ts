import { User } from '../../users/entities/user.entity';
export declare class Notification {
    id: string;
    userId: string;
    user: User;
    title: string;
    message: string;
    type: string;
    category: string;
    relatedId: string;
    isRead: boolean;
    createdAt: Date;
}
