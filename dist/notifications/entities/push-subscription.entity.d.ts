import { User } from '../../users/entities/user.entity';
export declare class PushSubscription {
    id: string;
    userId: string;
    user: User;
    endpoint: string;
    expirationTime: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    createdAt: Date;
}
