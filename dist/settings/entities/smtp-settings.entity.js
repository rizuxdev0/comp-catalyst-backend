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
exports.SmtpSettings = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let SmtpSettings = class SmtpSettings {
};
exports.SmtpSettings = SmtpSettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'smtp.gmail.com' }),
    (0, swagger_1.ApiProperty)({ example: 'smtp.gmail.com' }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 587 }),
    (0, swagger_1.ApiProperty)({ example: 587 }),
    __metadata("design:type", Number)
], SmtpSettings.prototype, "port", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'noreply@example.com' }),
    (0, swagger_1.ApiProperty)({ example: 'noreply@example.com' }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, select: false }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "pass", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], SmtpSettings.prototype, "secure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_name', default: 'Eco HR Solution' }),
    (0, swagger_1.ApiProperty)({ example: 'Eco HR Solution' }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "fromName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_email', default: 'noreply@example.com' }),
    (0, swagger_1.ApiProperty)({ example: 'noreply@example.com' }),
    __metadata("design:type", String)
], SmtpSettings.prototype, "fromEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], SmtpSettings.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SmtpSettings.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SmtpSettings.prototype, "updatedAt", void 0);
exports.SmtpSettings = SmtpSettings = __decorate([
    (0, typeorm_1.Entity)('smtp_settings')
], SmtpSettings);
//# sourceMappingURL=smtp-settings.entity.js.map