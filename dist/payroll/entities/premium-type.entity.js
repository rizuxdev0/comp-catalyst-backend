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
exports.PremiumType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let PremiumType = class PremiumType {
};
exports.PremiumType = PremiumType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], PremiumType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({ example: 'PRIME_TRANSPORT' }),
    __metadata("design:type", String)
], PremiumType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Prime de transport' }),
    __metadata("design:type", String)
], PremiumType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PremiumType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_taxable', default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PremiumType.prototype, "isTaxable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_recurring', default: false }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PremiumType.prototype, "isRecurring", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_amount', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 25000, required: false }),
    __metadata("design:type", Number)
], PremiumType.prototype, "defaultAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PremiumType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PremiumType.prototype, "updatedAt", void 0);
exports.PremiumType = PremiumType = __decorate([
    (0, typeorm_1.Entity)('premium_types')
], PremiumType);
//# sourceMappingURL=premium-type.entity.js.map