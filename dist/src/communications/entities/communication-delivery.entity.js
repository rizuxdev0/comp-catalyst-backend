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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationDelivery = void 0;
const typeorm_1 = require("typeorm");
const communication_entity_1 = require("./communication.entity");
let CommunicationDelivery = class CommunicationDelivery {
};
exports.CommunicationDelivery = CommunicationDelivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'communication_id' }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "communication_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => communication_entity_1.Communication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'communication_id' }),
    __metadata("design:type", communication_entity_1.Communication)
], CommunicationDelivery.prototype, "communication", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "employee_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_address' }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "email_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_type' }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "email_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], CommunicationDelivery.prototype, "sent_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivered_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], CommunicationDelivery.prototype, "delivered_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', nullable: true }),
    __metadata("design:type", String)
], CommunicationDelivery.prototype, "error_message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CommunicationDelivery.prototype, "created_at", void 0);
exports.CommunicationDelivery = CommunicationDelivery = __decorate([
    (0, typeorm_1.Entity)('communication_deliveries')
], CommunicationDelivery);
//# sourceMappingURL=communication-delivery.entity.js.map