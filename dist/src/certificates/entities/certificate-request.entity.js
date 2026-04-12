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
exports.CertificateRequest = exports.CertificateRequestStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var CertificateRequestStatus;
(function (CertificateRequestStatus) {
    CertificateRequestStatus["PENDING"] = "pending";
    CertificateRequestStatus["PROCESSING"] = "processing";
    CertificateRequestStatus["READY"] = "ready";
    CertificateRequestStatus["DELIVERED"] = "delivered";
    CertificateRequestStatus["REJECTED"] = "rejected";
})(CertificateRequestStatus || (exports.CertificateRequestStatus = CertificateRequestStatus = {}));
let CertificateRequest = class CertificateRequest {
};
exports.CertificateRequest = CertificateRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificateRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CertificateRequest.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], CertificateRequest.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'work_certificate', description: 'Type of certificate requested' }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CertificateRequestStatus,
        default: CertificateRequestStatus.PENDING,
    }),
    (0, swagger_1.ApiProperty)({ enum: CertificateRequestStatus }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processed_by', nullable: true }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "processedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', nullable: true }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', nullable: true }),
    __metadata("design:type", String)
], CertificateRequest.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CertificateRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CertificateRequest.prototype, "updatedAt", void 0);
exports.CertificateRequest = CertificateRequest = __decorate([
    (0, typeorm_1.Entity)('certificate_requests')
], CertificateRequest);
//# sourceMappingURL=certificate-request.entity.js.map