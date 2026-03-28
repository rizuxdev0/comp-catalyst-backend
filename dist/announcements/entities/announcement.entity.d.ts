import { User } from '../../users/entities/user.entity';
export declare class Announcement {
    id: string;
    title: string;
    content: string;
    isActive: boolean;
    isUrgent: boolean;
    expiresAt: Date;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
