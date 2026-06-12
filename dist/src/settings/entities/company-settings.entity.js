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
exports.CompanySettings = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let CompanySettings = class CompanySettings {
};
exports.CompanySettings = CompanySettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_name', default: 'Mon Entreprise' }),
    (0, swagger_1.ApiProperty)({ example: 'Eco HR Solution' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_form', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "legal_form", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "tax_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line1', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line2', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_province', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "state_province", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Togo' }),
    (0, swagger_1.ApiProperty)({ example: 'Togo' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', default: 'XOF' }),
    (0, swagger_1.ApiProperty)({ example: 'XOF' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "currency_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol', default: 'FCFA' }),
    (0, swagger_1.ApiProperty)({ example: 'FCFA' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "currency_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_format', default: 'dd/MM/yyyy' }),
    (0, swagger_1.ApiProperty)({ example: 'dd/MM/yyyy' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "date_format", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_format', default: 'HH:mm' }),
    (0, swagger_1.ApiProperty)({ example: 'HH:mm' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "time_format", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Africa/Lome' }),
    (0, swagger_1.ApiProperty)({ example: 'Africa/Lome' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'fr' }),
    (0, swagger_1.ApiProperty)({ example: 'fr' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_days_per_month', type: 'decimal', precision: 5, scale: 2, default: 22 }),
    (0, swagger_1.ApiProperty)({ example: 22 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "work_days_per_month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_hours_per_week', type: 'decimal', precision: 5, scale: 2, default: 40 }),
    (0, swagger_1.ApiProperty)({ example: 40 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "work_hours_per_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_rate', type: 'decimal', precision: 5, scale: 2, default: 1.15 }),
    (0, swagger_1.ApiProperty)({ example: 1.15 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "overtime_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_contribution_rate', type: 'decimal', precision: 5, scale: 2, default: 4.0 }),
    (0, swagger_1.ApiProperty)({ example: 4.0 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "employee_contribution_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employer_contribution_rate', type: 'decimal', precision: 5, scale: 2, default: 17.5 }),
    (0, swagger_1.ApiProperty)({ example: 17.5 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "employer_contribution_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'csg_crds_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "csg_crds_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_leave_days', type: 'decimal', precision: 5, scale: 2, default: 30 }),
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "annual_leave_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sick_leave_days', type: 'decimal', precision: 5, scale: 2, default: 15 }),
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "sick_leave_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fiscal_year_start_month', type: 'int', default: 1 }),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "fiscal_year_start_month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_monthly_leave_accrual', type: 'decimal', precision: 5, scale: 2, default: 2.5 }),
    (0, swagger_1.ApiProperty)({ example: 2.5 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "default_monthly_leave_accrual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_salary_payment_day', type: 'int', default: 25 }),
    (0, swagger_1.ApiProperty)({ example: 25, description: 'Le quantième du mois (1-31) pour le paiement par défaut des salaires' }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "default_salary_payment_day", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'print_settings', type: 'jsonb', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], CompanySettings.prototype, "print_settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_initialized', default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CompanySettings.prototype, "is_initialized", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_working_days_per_week', type: 'decimal', precision: 5, scale: 2, default: 5 }),
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "default_working_days_per_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_trial_period_days', type: 'int', default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "default_trial_period_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_notice_period_days', type: 'int', default: 30 }),
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "default_notice_period_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collective_agreement', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "collective_agreement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'classification', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "classification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coefficient', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "coefficient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ceo_name', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "ceo_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ceo_email', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "ceo_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ceo_position', default: 'Directeur Général' }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "ceo_position", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ceo_signature_url', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CompanySettings.prototype, "ceo_signature_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leave_approval_mode', default: 'simple' }),
    (0, swagger_1.ApiProperty)({ example: 'simple', description: 'Mode d\'approbation des congés: simple (admin direct) ou workflow (étapes multiples)' }),
    __metadata("design:type", String)
], CompanySettings.prototype, "leave_approval_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'night_on_call_rate', type: 'decimal', precision: 5, scale: 2, default: 1.5 }),
    (0, swagger_1.ApiProperty)({ example: 1.5, description: 'Multiplier for night on-call duty' }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "night_on_call_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weekend_on_call_rate', type: 'decimal', precision: 5, scale: 2, default: 2.0 }),
    (0, swagger_1.ApiProperty)({ example: 2.0, description: 'Multiplier for weekend on-call duty' }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "weekend_on_call_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'holiday_on_call_rate', type: 'decimal', precision: 5, scale: 2, default: 2.5 }),
    (0, swagger_1.ApiProperty)({ example: 2.5, description: 'Multiplier for holiday on-call duty' }),
    __metadata("design:type", Number)
], CompanySettings.prototype, "holiday_on_call_rate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CompanySettings.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CompanySettings.prototype, "updated_at", void 0);
exports.CompanySettings = CompanySettings = __decorate([
    (0, typeorm_1.Entity)('company_settings')
], CompanySettings);
//# sourceMappingURL=company-settings.entity.js.map