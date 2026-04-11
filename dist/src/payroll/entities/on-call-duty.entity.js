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
exports.OnCallDuty = exports.OnCallType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var OnCallType;
(function (OnCallType) {
    OnCallType["NIGHT"] = "night";
    OnCallType["WEEKEND"] = "weekend";
    OnCallType["HOLIDAY"] = "holiday";
    OnCallType["GENERAL"] = "general";
})(OnCallType || (exports.OnCallType = OnCallType = {}));
let OnCallDuty = class OnCallDuty {
};
exports.OnCallDuty = OnCallDuty;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], OnCallDuty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], OnCallDuty.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], OnCallDuty.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-05-01' }),
    __metadata("design:type", String)
], OnCallDuty.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OnCallType,
        default: OnCallType.GENERAL,
    }),
    (0, swagger_1.ApiProperty)({ enum: OnCallType }),
    __metadata("design:type", String)
], OnCallDuty.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], OnCallDuty.prototype, "hours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Calculated compensation amount' }),
    __metadata("design:type", Number)
], OnCallDuty.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ example: false, description: 'Whether this has been included in a payslip' }),
    __metadata("design:type", Boolean)
], OnCallDuty.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payslip_id', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], OnCallDuty.prototype, "payslipId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], OnCallDuty.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], OnCallDuty.prototype, "updatedAt", void 0);
exports.OnCallDuty = OnCallDuty = __decorate([
    (0, typeorm_1.Entity)('on_call_duties')
], OnCallDuty);
//# sourceMappingURL=on-call-duty.entity.js.map