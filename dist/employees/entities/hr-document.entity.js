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
exports.HRDocument = exports.HRDocumentStatus = exports.HRDocumentType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var HRDocumentType;
(function (HRDocumentType) {
    HRDocumentType["CONTRACT"] = "contract";
    HRDocumentType["PAYSLIP"] = "payslip";
    HRDocumentType["CERTIFICATE"] = "certificate";
    HRDocumentType["ID_PROOF"] = "id_proof";
    HRDocumentType["RESUME"] = "resume";
    HRDocumentType["DIPLOMA"] = "diploma";
    HRDocumentType["OTHER"] = "other";
})(HRDocumentType || (exports.HRDocumentType = HRDocumentType = {}));
var HRDocumentStatus;
(function (HRDocumentStatus) {
    HRDocumentStatus["DRAFT"] = "draft";
    HRDocumentStatus["SIGNED"] = "signed";
    HRDocumentStatus["EXPIRED"] = "expired";
    HRDocumentStatus["VALID"] = "valid";
})(HRDocumentStatus || (exports.HRDocumentStatus = HRDocumentStatus = {}));
let HRDocument = class HRDocument {
};
exports.HRDocument = HRDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], HRDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], HRDocument.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], HRDocument.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Contrat de travail - Jean Dupont' }),
    __metadata("design:type", String)
], HRDocument.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HRDocumentType,
    }),
    (0, swagger_1.ApiProperty)({ enum: HRDocumentType }),
    __metadata("design:type", String)
], HRDocument.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Contrats', required: false }),
    __metadata("design:type", String)
], HRDocument.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url' }),
    (0, swagger_1.ApiProperty)({ example: 'https://storage.example.com/docs/uuid.pdf' }),
    __metadata("design:type", String)
], HRDocument.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HRDocument.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', nullable: true }),
    __metadata("design:type", String)
], HRDocument.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', nullable: true }),
    __metadata("design:type", Number)
], HRDocument.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_confidential', default: false }),
    __metadata("design:type", Boolean)
], HRDocument.prototype, "isConfidential", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_signed', default: false }),
    __metadata("design:type", Boolean)
], HRDocument.prototype, "isSigned", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], HRDocument.prototype, "signedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_by', nullable: true }),
    __metadata("design:type", String)
], HRDocument.prototype, "signedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HRDocumentStatus,
        default: HRDocumentStatus.VALID,
    }),
    (0, swagger_1.ApiProperty)({ enum: HRDocumentStatus }),
    __metadata("design:type", String)
], HRDocument.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], HRDocument.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HRDocument.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], HRDocument.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], HRDocument.prototype, "updatedAt", void 0);
exports.HRDocument = HRDocument = __decorate([
    (0, typeorm_1.Entity)('hr_documents')
], HRDocument);
//# sourceMappingURL=hr-document.entity.js.map