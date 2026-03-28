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
exports.SalaryDeduction = exports.ApprovalStatus = exports.DeductionStatus = exports.DeductionType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var DeductionType;
(function (DeductionType) {
    DeductionType["ADVANCE"] = "advance";
    DeductionType["LOAN"] = "loan";
    DeductionType["GARNISHMENT"] = "garnishment";
    DeductionType["ABSENCE"] = "absence";
    DeductionType["EQUIPMENT"] = "equipment";
    DeductionType["PENALTY"] = "penalty";
    DeductionType["OTHER"] = "other";
})(DeductionType || (exports.DeductionType = DeductionType = {}));
var DeductionStatus;
(function (DeductionStatus) {
    DeductionStatus["ACTIVE"] = "active";
    DeductionStatus["PAUSED"] = "paused";
    DeductionStatus["COMPLETED"] = "completed";
    DeductionStatus["CANCELLED"] = "cancelled";
})(DeductionStatus || (exports.DeductionStatus = DeductionStatus = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
let SalaryDeduction = class SalaryDeduction {
};
exports.SalaryDeduction = SalaryDeduction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], SalaryDeduction.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DeductionType,
    }),
    (0, swagger_1.ApiProperty)({ enum: DeductionType }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    __metadata("design:type", Number)
], SalaryDeduction.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount_per_month', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    __metadata("design:type", Number)
], SalaryDeduction.prototype, "amountPerMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_amount', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 75000 }),
    __metadata("design:type", Number)
], SalaryDeduction.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], SalaryDeduction.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], SalaryDeduction.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installments_count', default: 1 }),
    (0, swagger_1.ApiProperty)({ example: 4 }),
    __metadata("design:type", Number)
], SalaryDeduction.prototype, "installmentsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installments_paid', default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SalaryDeduction.prototype, "installmentsPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DeductionStatus,
        default: DeductionStatus.ACTIVE,
    }),
    (0, swagger_1.ApiProperty)({ enum: DeductionStatus }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'approval_status',
        type: 'enum',
        enum: ApprovalStatus,
        default: ApprovalStatus.PENDING,
    }),
    (0, swagger_1.ApiProperty)({ enum: ApprovalStatus }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "approvalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], SalaryDeduction.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SalaryDeduction.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SalaryDeduction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SalaryDeduction.prototype, "updatedAt", void 0);
exports.SalaryDeduction = SalaryDeduction = __decorate([
    (0, typeorm_1.Entity)('salary_deductions')
], SalaryDeduction);
//# sourceMappingURL=salary-deduction.entity.js.map