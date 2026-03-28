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
exports.Contract = exports.ContractStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const contract_type_entity_1 = require("./contract-type.entity");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "draft";
    ContractStatus["ACTIVE"] = "active";
    ContractStatus["SUSPENDED"] = "suspended";
    ContractStatus["TERMINATED"] = "terminated";
    ContractStatus["EXPIRED"] = "expired";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
let Contract = class Contract {
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid', description: 'Unique identifier' }),
    __metadata("design:type", String)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_number', unique: true }),
    (0, swagger_1.ApiProperty)({ example: 'CONT-2024-001' }),
    __metadata("design:type", String)
], Contract.prototype, "contractNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Contract.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Contract.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_type_id' }),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Contract.prototype, "contractTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_type_entity_1.ContractType),
    (0, typeorm_1.JoinColumn)({ name: 'contract_type_id' }),
    __metadata("design:type", contract_type_entity_1.ContractType)
], Contract.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContractStatus,
        default: ContractStatus.DRAFT,
    }),
    (0, swagger_1.ApiProperty)({ enum: ContractStatus }),
    __metadata("design:type", String)
], Contract.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_title' }),
    (0, swagger_1.ApiProperty)({ example: 'Senior Developer' }),
    __metadata("design:type", String)
], Contract.prototype, "jobTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    __metadata("design:type", Date)
], Contract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2024-12-31', required: false }),
    __metadata("design:type", Date)
], Contract.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 500000 }),
    __metadata("design:type", Number)
], Contract.prototype, "baseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours_per_week', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 40 }),
    __metadata("design:type", Number)
], Contract.prototype, "workingHoursPerWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_renewable', default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], Contract.prototype, "isRenewable", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Contract.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Contract.prototype, "updatedAt", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)('contracts')
], Contract);
//# sourceMappingURL=contract.entity.js.map