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
exports.DocumentSignature = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const hr_document_entity_1 = require("../../employees/entities/hr-document.entity");
let DocumentSignature = class DocumentSignature {
};
exports.DocumentSignature = DocumentSignature;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hr_document_entity_1.HRDocument),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", hr_document_entity_1.HRDocument)
], DocumentSignature.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signer_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "signerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signer_name' }),
    (0, swagger_1.ApiProperty)({ example: 'Jean Dupont' }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "signerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signer_email', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'jean.dupont@example.com', required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "signerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_type' }),
    (0, swagger_1.ApiProperty)({ example: 'drawn' }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "signatureType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_image_url', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "signatureImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validation_code', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "validationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_valid', default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DocumentSignature.prototype, "isValid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], DocumentSignature.prototype, "signedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revoked_at', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], DocumentSignature.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revoked_reason', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DocumentSignature.prototype, "revokedReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], DocumentSignature.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DocumentSignature.prototype, "createdAt", void 0);
exports.DocumentSignature = DocumentSignature = __decorate([
    (0, typeorm_1.Entity)('document_signatures')
], DocumentSignature);
//# sourceMappingURL=document-signature.entity.js.map