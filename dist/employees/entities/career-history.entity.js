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
exports.CareerHistory = exports.CareerChangeType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var CareerChangeType;
(function (CareerChangeType) {
    CareerChangeType["PROMOTION"] = "promotion";
    CareerChangeType["TRANSFER"] = "transfer";
    CareerChangeType["DEMOTION"] = "demotion";
    CareerChangeType["SALARY_INCREASE"] = "salary_increase";
    CareerChangeType["INITIAL_ASSIGNMENT"] = "initial_assignment";
    CareerChangeType["OTHER"] = "other";
})(CareerChangeType || (exports.CareerChangeType = CareerChangeType = {}));
let CareerHistory = class CareerHistory {
};
exports.CareerHistory = CareerHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CareerHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CareerHistory.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], CareerHistory.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'change_date', type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    __metadata("design:type", Date)
], CareerHistory.prototype, "changeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CareerChangeType,
    }),
    (0, swagger_1.ApiProperty)({ enum: CareerChangeType }),
    __metadata("design:type", String)
], CareerHistory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_position', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Junior Developer', required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "oldPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_position', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Senior Developer', required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "newPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_department', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'IT', required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "oldDepartment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_department', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'R&D', required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "newDepartment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_salary', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 500000, required: false }),
    __metadata("design:type", Number)
], CareerHistory.prototype, "oldSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_salary', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 700000, required: false }),
    __metadata("design:type", Number)
], CareerHistory.prototype, "newSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Excellent performance review', required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CareerHistory.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CareerHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CareerHistory.prototype, "updatedAt", void 0);
exports.CareerHistory = CareerHistory = __decorate([
    (0, typeorm_1.Entity)('career_histories')
], CareerHistory);
//# sourceMappingURL=career-history.entity.js.map