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
exports.Establishment = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const company_settings_entity_1 = require("../../settings/entities/company-settings.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let Establishment = class Establishment {
};
exports.Establishment = Establishment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Establishment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Siège Social' }),
    __metadata("design:type", String)
], Establishment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code_ape', nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '7010Z' }),
    __metadata("design:type", String)
], Establishment.prototype, "code_ape", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Tertiaire' }),
    __metadata("design:type", String)
], Establishment.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Numéro d\'enregistrement spécifique à l\'établissement (ex: SIRET)' }),
    __metadata("design:type", String)
], Establishment.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Establishment.prototype, "tax_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line1', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Establishment.prototype, "address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Establishment.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Establishment.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_main', default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Indique s\'il s\'agit de l\'établissement principal' }),
    __metadata("design:type", Boolean)
], Establishment.prototype, "is_main", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_id' }),
    __metadata("design:type", String)
], Establishment.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_settings_entity_1.CompanySettings),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_settings_entity_1.CompanySettings)
], Establishment.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.establishment),
    __metadata("design:type", Array)
], Establishment.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Establishment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Establishment.prototype, "updated_at", void 0);
exports.Establishment = Establishment = __decorate([
    (0, typeorm_1.Entity)('establishments')
], Establishment);
//# sourceMappingURL=establishment.entity.js.map