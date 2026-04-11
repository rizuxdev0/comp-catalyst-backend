import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { PushSubscription } from './entities/push-subscription.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private readonly preferencesRepository: Repository<NotificationPreference>,
    @InjectRepository(PushSubscription)
    private readonly pushRepository: Repository<PushSubscription>,
  ) {}

  // ===================== NOTIFICATIONS =====================

  async findAllByUser(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async create(data: Partial<Notification>): Promise<Notification> {
    const notify = this.notificationsRepository.create(data);
    return this.notificationsRepository.save(notify);
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id, userId } });
    if (!notification) throw new NotFoundException('Notification not found');
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.update({ userId, isRead: false }, { isRead: true });
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.notificationsRepository.delete({ id, userId });
  }

  async clearAll(userId: string): Promise<void> {
    await this.notificationsRepository.delete({ userId });
  }

  // ===================== PREFERENCES =====================

  async getPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.preferencesRepository.find({
      where: { userId },
      order: { category: 'ASC' },
    });
  }

  async updatePreferences(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference> {
    // If an id is provided, update the specific preference
    if (data.id) {
      const existing = await this.preferencesRepository.findOne({ where: { id: data.id, userId } });
      if (!existing) throw new NotFoundException('Notification preference not found');
      Object.assign(existing, data);
      return this.preferencesRepository.save(existing);
    }

    // Otherwise, find by category and upsert
    if (data.category) {
      let existing = await this.preferencesRepository.findOne({
        where: { userId, category: data.category },
      });
      if (existing) {
        Object.assign(existing, data);
        return this.preferencesRepository.save(existing);
      }
    }

    // Create new preference
    const pref = this.preferencesRepository.create({ ...data, userId });
    return this.preferencesRepository.save(pref);
  }

  async createPreference(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference> {
    const pref = this.preferencesRepository.create({ ...data, userId });
    return this.preferencesRepository.save(pref);
  }

  async updatePreferenceById(id: string, userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference> {
    const existing = await this.preferencesRepository.findOne({ where: { id, userId } });
    if (!existing) throw new NotFoundException('Notification preference not found');
    Object.assign(existing, data);
    return this.preferencesRepository.save(existing);
  }

  // ===================== PUSH =====================

  async saveSubscription(userId: string, subscription: any): Promise<PushSubscription> {
    // Check if subscription already exists for this endpoint
    const existing = await this.pushRepository.findOne({ where: { endpoint: subscription.endpoint, userId } });
    if (existing) {
      existing.keys = subscription.keys;
      existing.expirationTime = subscription.expirationTime;
      return this.pushRepository.save(existing);
    }

    const sub = this.pushRepository.create({
      userId,
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: subscription.keys,
    });
    return this.pushRepository.save(sub);
  }

  async findSubscriptions(userId: string): Promise<PushSubscription[]> {
    return this.pushRepository.find({ where: { userId } });
  }
}
