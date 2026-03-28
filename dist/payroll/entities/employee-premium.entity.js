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
exports.EmployeePremium = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const premium_type_entity_1 = require("./premium-type.entity");
let EmployeePremium = class EmployeePremium {
};
exports.EmployeePremium = EmployeePremium;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], EmployeePremium.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], EmployeePremium.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeePremium.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'premium_type_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], EmployeePremium.prototype, "premiumTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premium_type_entity_1.PremiumType),
    (0, typeorm_1.JoinColumn)({ name: 'premium_type_id' }),
    (0, swagger_1.ApiProperty)({ type: () => premium_type_entity_1.PremiumType }),
    __metadata("design:type", premium_type_entity_1.PremiumType)
], EmployeePremium.prototype, "premiumType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    __metadata("design:type", Number)
], EmployeePremium.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], EmployeePremium.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], EmployeePremium.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], EmployeePremium.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], EmployeePremium.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], EmployeePremium.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], EmployeePremium.prototype, "updatedAt", void 0);
exports.EmployeePremium = EmployeePremium = __decorate([
    (0, typeorm_1.Entity)('employee_premiums')
], EmployeePremium);
//# sourceMappingURL=employee-premium.entity.js.map