"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSubscriber = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
let AuditSubscriber = class AuditSubscriber {
    constructor(connection, eventEmitter) {
        this.connection = connection;
        this.eventEmitter = eventEmitter;
        connection.subscribers.push(this);
    }
    afterInsert(event) {
        const targetName = event.metadata.targetName;
        if (targetName === 'AuditLog')
            return;
        this.eventEmitter.emit('audit.log', {
            action: 'CREATE',
            entityType: targetName,
            entityId: event.entity?.id,
            entityName: this.getEntityName(event.entity),
            newValues: this.sanitizeValues(event.entity),
            userId: event.queryRunner?.data?.userId || null,
        });
    }
    afterUpdate(event) {
        const targetName = event.metadata.targetName;
        if (targetName === 'AuditLog')
            return;
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
    afterRemove(event) {
        const targetName = event.metadata.targetName;
        if (targetName === 'AuditLog')
            return;
        this.eventEmitter.emit('audit.log', {
            action: 'DELETE',
            entityType: targetName,
            entityId: event.entityId,
            entityName: this.getEntityName(event.databaseEntity),
            oldValues: this.sanitizeValues(event.databaseEntity),
            userId: event.queryRunner?.data?.userId || null,
        });
    }
    getEntityName(entity) {
        if (!entity)
            return undefined;
        if (entity.firstName || entity.lastName) {
            return `${entity.firstName || ''} ${entity.lastName || ''}`.trim();
        }
        if (entity.first_name || entity.last_name) {
            return `${entity.first_name || ''} ${entity.last_name || ''}`.trim();
        }
        return entity.name || entity.title || entity.label || entity.code || undefined;
    }
    sanitizeValues(entity) {
        if (!entity)
            return null;
        const sanitized = { ...entity };
        const sensitiveFields = ['password', 'passwordHash', 'password_hash', 'salt'];
        sensitiveFields.forEach(field => {
            if (field in sanitized) {
                sanitized[field] = '[MASKED]';
            }
        });
        return sanitized;
    }
};
exports.AuditSubscriber = AuditSubscriber;
exports.AuditSubscriber = AuditSubscriber = __decorate([
    (0, typeorm_2.EventSubscriber)(),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        event_emitter_1.EventEmitter2])
], AuditSubscriber);
//# sourceMappingURL=audit.subscriber.js.map