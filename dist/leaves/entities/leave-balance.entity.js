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
exports.LeaveBalance = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const leave_type_entity_1 = require("./leave-type.entity");
let LeaveBalance = class LeaveBalance {
};
exports.LeaveBalance = LeaveBalance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveBalance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveBalance.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], LeaveBalance.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leave_type_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], LeaveBalance.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveType),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveType)
], LeaveBalance.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entitled_days', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "entitledDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'taken_days', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "takenDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pending_days', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "pendingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carried_over_days', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "carriedOverDays", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], LeaveBalance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], LeaveBalance.prototype, "updatedAt", void 0);
exports.LeaveBalance = LeaveBalance = __decorate([
    (0, typeorm_1.Entity)('leave_balances'),
    (0, typeorm_1.Unique)(['employeeId', 'leaveTypeId', 'year'])
], LeaveBalance);
//# sourceMappingURL=leave-balance.entity.js.map