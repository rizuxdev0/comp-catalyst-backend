import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AuditSubscriber implements EntitySubscriberInterface {
    readonly connection: Connection;
    private readonly eventEmitter;
    constructor(connection: Connection, eventEmitter: EventEmitter2);
    afterInsert(event: InsertEvent<any>): void;
    afterUpdate(event: UpdateEvent<any>): void;
    afterRemove(event: RemoveEvent<any>): void;
    private getEntityName;
    private sanitizeValues;
}
