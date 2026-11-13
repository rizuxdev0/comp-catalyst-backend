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
exports.PaySlip = exports.PaySlipStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var PaySlipStatus;
(function (PaySlipStatus) {
    PaySlipStatus["DRAFT"] = "draft";
    PaySlipStatus["VALIDATED"] = "validated";
    PaySlipStatus["PAID"] = "paid";
    PaySlipStatus["CANCELLED"] = "cancelled";
})(PaySlipStatus || (exports.PaySlipStatus = PaySlipStatus = {}));
let PaySlip = class PaySlip {
};
exports.PaySlip = PaySlip;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], PaySlip.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], PaySlip.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ type: () => employee_entity_1.Employee }),
    __metadata("design:type", employee_entity_1.Employee)
], PaySlip.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_id', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'uuid', required: false }),
    __metadata("design:type", String)
], PaySlip.prototype, "establishmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'period_month' }),
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "periodMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'period_year' }),
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "periodYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 500000 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "baseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gross_salary', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 600000 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_salary', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 450000 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "netSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_premiums', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "totalPremiums", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_deductions', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    __metadata("design:type", Number)
], PaySlip.prototype, "totalDeductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'premiums_detail', default: [] }),
    (0, swagger_1.ApiProperty)({ example: [{ label: 'Bonus', amount: 100000 }] }),
    __metadata("design:type", Array)
], PaySlip.prototype, "premiumsDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'deductions_detail', default: [] }),
    (0, swagger_1.ApiProperty)({ example: [{ label: 'Social Sec', amount: 50000 }] }),
    __metadata("design:type", Array)
], PaySlip.prototype, "deductionsDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'employer_detail', default: [] }),
    (0, swagger_1.ApiProperty)({ example: [{ label: 'Employer Social', amount: 80000 }] }),
    __metadata("design:type", Array)
], PaySlip.prototype, "employerDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaySlipStatus,
        default: PaySlipStatus.DRAFT,
    }),
    (0, swagger_1.ApiProperty)({ enum: PaySlipStatus }),
    __metadata("design:type", String)
], PaySlip.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_by', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PaySlip.prototype, "validatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_at', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], PaySlip.prototype, "validatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], PaySlip.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PaySlip.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PaySlip.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PaySlip.prototype, "updatedAt", void 0);
exports.PaySlip = PaySlip = __decorate([
    (0, typeorm_1.Entity)('payslips')
], PaySlip);
//# sourceMappingURL=payslip.entity.js.map