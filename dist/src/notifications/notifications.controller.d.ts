import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: any): Promise<import("./entities/notification.entity").Notification[]>;
    getPreferences(req: any): Promise<import("./entities/notification-preference.entity").NotificationPreference[]>;
    createPreference(data: any, req: any): Promise<import("./entities/notification-preference.entity").NotificationPreference>;
    updatePreferenceById(id: string, data: any, req: any): Promise<import("./entities/notification-preference.entity").NotificationPreference>;
    updatePreferences(data: any, req: any): Promise<import("./entities/notification-preference.entity").NotificationPreference>;
    create(data: any, req: any): Promise<import("./entities/notification.entity").Notification>;
    markAsRead(id: string, req: any): Promise<import("./entities/notification.entity").Notification>;
    markAllRead(req: any): Promise<void>;
    remove(id: string, req: any): Promise<void>;
    clearAll(req: any): Promise<void>;
    subscribeToPush(subscription: any, req: any): Promise<import("./entities/push-subscription.entity").PushSubscription>;
}
