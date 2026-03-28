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
exports.LeaveRequest = exports.LeaveRequestStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const leave_type_entity_1 = require("./leave-type.entity");
var LeaveRequestStatus;
(function (LeaveRequestStatus) {
    LeaveRequestStatus["PENDING"] = "pending";
    LeaveRequestStatus["APPROVED"] = "approved";
    LeaveRequestStatus["REJECTED"] = "rejected";
    LeaveRequestStatus["CANCELLED"] = "cancelled";
})(LeaveRequestStatus || (exports.LeaveRequestStatus = LeaveRequestStatus = {}));
let LeaveRequest = class LeaveRequest {
};
exports.LeaveRequest = LeaveRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ type: () => employee_entity_1.Employee }),
    __metadata("design:type", employee_entity_1.Employee)
], LeaveRequest.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leave_type_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveType),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_id' }),
    (0, swagger_1.ApiProperty)({ type: () => leave_type_entity_1.LeaveType }),
    __metadata("design:type", leave_type_entity_1.LeaveType)
], LeaveRequest.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-05-01' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-05-15' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'days_count', type: 'decimal', precision: 5, scale: 1 }),
    (0, swagger_1.ApiProperty)({ example: 10.5 }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "daysCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LeaveRequestStatus,
        default: LeaveRequestStatus.PENDING,
    }),
    (0, swagger_1.ApiProperty)({ enum: LeaveRequestStatus }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "updatedAt", void 0);
exports.LeaveRequest = LeaveRequest = __decorate([
    (0, typeorm_1.Entity)('leave_requests')
], LeaveRequest);
//# sourceMappingURL=leave-request.entity.js.map