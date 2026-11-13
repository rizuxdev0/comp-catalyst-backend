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
exports.CollectiveAgreement = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let CollectiveAgreement = class CollectiveAgreement {
};
exports.CollectiveAgreement = CollectiveAgreement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ example: 'Convention Collective Interprofessionnelle du Togo' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({ example: 'CCIT-TG' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Description de la convention' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: 'Togo' }),
    (0, swagger_1.ApiProperty)({ example: 'Togo' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "effective_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2026-12-31' }),
    __metadata("design:type", String)
], CollectiveAgreement.prototype, "expiry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: { smig: 52500, base_value: 525 } }),
    __metadata("design:type", Object)
], CollectiveAgreement.prototype, "salary_grid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'classification_levels', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: [] }),
    __metadata("design:type", Object)
], CollectiveAgreement.prototype, "classification_levels", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours_per_week', type: 'int', default: 40 }),
    (0, swagger_1.ApiProperty)({ example: 40 }),
    __metadata("design:type", Number)
], CollectiveAgreement.prototype, "working_hours_per_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'overtime_rules', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: { rate_25: 1.25, rate_50: 1.5, rate_100: 2 } }),
    __metadata("design:type", Object)
], CollectiveAgreement.prototype, "overtime_rules", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'leave_rules', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: { annual: 30, maternity: 14, paternity: 3 } }),
    __metadata("design:type", Object)
], CollectiveAgreement.prototype, "leave_rules", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CollectiveAgreement.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CollectiveAgreement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CollectiveAgreement.prototype, "updatedAt", void 0);
exports.CollectiveAgreement = CollectiveAgreement = __decorate([
    (0, typeorm_1.Entity)('collective_agreements')
], CollectiveAgreement);
//# sourceMappingURL=collective-agreement.entity.js.map