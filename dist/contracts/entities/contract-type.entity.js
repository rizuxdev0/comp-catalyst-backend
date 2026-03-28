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
exports.ContractType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let ContractType = class ContractType {
};
exports.ContractType = ContractType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], ContractType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({ example: 'CDI', description: 'Code unique du type de contrat' }),
    __metadata("design:type", String)
], ContractType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Contrat à Durée Indéterminée' }),
    __metadata("design:type", String)
], ContractType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Contrat standard sans date de fin' }),
    __metadata("design:type", String)
], ContractType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)({ example: true, description: 'Si le contrat a une durée indéterminée' }),
    __metadata("design:type", Boolean)
], ContractType.prototype, "isPermanent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ContractType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_trial_period_days', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    __metadata("design:type", Number)
], ContractType.prototype, "defaultTrialPeriodDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_notice_period_days', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    __metadata("design:type", Number)
], ContractType.prototype, "defaultNoticePeriodDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'suggested_worker_category', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Cadre', required: false }),
    __metadata("design:type", String)
], ContractType.prototype, "suggestedWorkerCategory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContractType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContractType.prototype, "updatedAt", void 0);
exports.ContractType = ContractType = __decorate([
    (0, typeorm_1.Entity)('contract_types')
], ContractType);
//# sourceMappingURL=contract-type.entity.js.map