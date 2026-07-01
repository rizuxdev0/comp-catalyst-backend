import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { 
  Connection, 
  EntitySubscriberInterface, 
  EventSubscriber, 
  InsertEvent, 
  UpdateEvent, 
  RemoveEvent 
} from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@EventSubscriber()
@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly eventEmitter: EventEmitter2,
  ) {
    connection.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<any>) {
    const targetName = event.metadata.targetName;
    // Prevent logging AuditLog itself to avoid infinite loops
    if (targetName === 'AuditLog') return;

    this.eventEmitter.emit('audit.log', {
      action: 'CREATE',
      entityType: targetName,
      entityId: event.entity?.id,
      entityName: this.getEntityName(event.entity),
      newValues: this.sanitizeValues(event.entity),
      userId: event.queryRunner?.data?.userId || null,
    });
  }

  afterUpdate(event: UpdateEvent<any>) {
    const targetName = event.metadata.targetName;
    if (targetName === 'AuditLog') return;

    this.eventEmitter.emit('audit.log', {
      action: 'UPDATE',
      entityType: targetName,
      entityId: event.entity?.id || event.databaseEntity?.id,
      entityName: this.getEntityName(event.entity || event.databaseEntity),
      oldValues: this.sanitizeValues(event.databaseEntity),
      newValues: this.sanitizeValues(event.entity),
      userId: event.queryRunner?.data?.userId || null,
    });
  }

  afterRemove(event: RemoveEvent<any>) {
    const targetName = event.metadata.targetName;
    if (targetName === 'AuditLog') return;

    this.eventEmitter.emit('audit.log', {
      action: 'DELETE',
      entityType: targetName,
      entityId: event.entityId,
      entityName: this.getEntityName(event.databaseEntity),
      oldValues: this.sanitizeValues(event.databaseEntity),
      userId: event.queryRunner?.data?.userId || null,
    });
  }

  private getEntityName(entity: any): string | undefined {
    if (!entity) return undefined;
    if (entity.firstName || entity.lastName) {
      return `${entity.firstName || ''} ${entity.lastName || ''}`.trim();
    }
    if (entity.first_name || entity.last_name) {
      return `${entity.first_name || ''} ${entity.last_name || ''}`.trim();
    }
    return entity.name || entity.title || entity.label || entity.code || undefined;
  }

  private sanitizeValues(entity: any): any {
    if (!entity) return null;
    const sanitized = { ...entity };
    // Remove sensitive fields if they exist
    const sensitiveFields = ['password', 'passwordHash', 'password_hash', 'salt'];
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        sanitized[field] = '[MASKED]';
      }
    });
    return sanitized;
  }
}
