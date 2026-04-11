import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { PushSubscription } from './entities/push-subscription.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Contract } from '../contracts/entities/contract.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsListener } from './notifications.listener';
import { AlertsTask } from './alerts.task';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification, 
      NotificationPreference, 
      PushSubscription,
      Employee,
      Contract
    ])
  ],
  providers: [NotificationsService, NotificationsListener, AlertsTask],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
