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
exports.ContractTypeSetting = void 0;
const typeorm_1 = require("typeorm");
let ContractTypeSetting = class ContractTypeSetting {
};
exports.ContractTypeSetting = ContractTypeSetting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContractTypeSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContractTypeSetting.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ContractTypeSetting.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContractTypeSetting.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_duration_months', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ContractTypeSetting.prototype, "max_duration_months", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ContractTypeSetting.prototype, "renewable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_renewals', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContractTypeSetting.prototype, "max_renewals", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trial_period_days', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContractTypeSetting.prototype, "trial_period_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notice_period_days', type: 'int', default: 30 }),
    __metadata("design:type", Number)
], ContractTypeSetting.prototype, "notice_period_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requires_end_date', default: false }),
    __metadata("design:type", Boolean)
], ContractTypeSetting.prototype, "requires_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'specific_rules', type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], ContractTypeSetting.prototype, "specific_rules", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], ContractTypeSetting.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContractTypeSetting.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContractTypeSetting.prototype, "updated_at", void 0);
exports.ContractTypeSetting = ContractTypeSetting = __decorate([
    (0, typeorm_1.Entity)('contract_type_settings')
], ContractTypeSetting);
//# sourceMappingURL=contract-type-setting.entity.js.map