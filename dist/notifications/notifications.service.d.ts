import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { PushSubscription } from './entities/push-subscription.entity';
export declare class NotificationsService {
    private readonly notificationsRepository;
    private readonly preferencesRepository;
    private readonly pushRepository;
    constructor(notificationsRepository: Repository<Notification>, preferencesRepository: Repository<NotificationPreference>, pushRepository: Repository<PushSubscription>);
    findAllByUser(userId: string): Promise<Notification[]>;
    create(data: Partial<Notification>): Promise<Notification>;
    markAsRead(id: string, userId: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<void>;
    delete(id: string, userId: string): Promise<void>;
    clearAll(userId: string): Promise<void>;
    getPreferences(userId: string): Promise<NotificationPreference[]>;
    updatePreferences(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference>;
    createPreference(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference>;
    updatePreferenceById(id: string, userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference>;
    saveSubscription(userId: string, subscription: any): Promise<PushSubscription>;
    findSubscriptions(userId: string): Promise<PushSubscription[]>;
}
