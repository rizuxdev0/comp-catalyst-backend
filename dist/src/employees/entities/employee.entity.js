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
exports.Employee = exports.MarriageRegime = exports.ShiftType = exports.SalaryFrequency = exports.MaritalStatus = exports.CivilityType = exports.GenderType = exports.WorkMode = exports.EmploymentType = exports.EmployeeStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const establishment_entity_1 = require("../../establishments/entities/establishment.entity");
var EmployeeStatus;
(function (EmployeeStatus) {
    EmployeeStatus["ACTIVE"] = "active";
    EmployeeStatus["ON_LEAVE"] = "on_leave";
    EmployeeStatus["SUSPENDED"] = "suspended";
    EmployeeStatus["TERMINATED"] = "terminated";
    EmployeeStatus["RETIRED"] = "retired";
})(EmployeeStatus || (exports.EmployeeStatus = EmployeeStatus = {}));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["PERMANENT"] = "permanent";
    EmploymentType["FIXED_TERM"] = "fixed_term";
    EmploymentType["INTERN"] = "intern";
    EmploymentType["CONSULTANT"] = "consultant";
    EmploymentType["TEMPORARY"] = "temporary";
})(EmploymentType || (exports.EmploymentType = EmploymentType = {}));
var WorkMode;
(function (WorkMode) {
    WorkMode["ON_SITE"] = "on_site";
    WorkMode["REMOTE"] = "remote";
    WorkMode["HYBRID"] = "hybrid";
})(WorkMode || (exports.WorkMode = WorkMode = {}));
var GenderType;
(function (GenderType) {
    GenderType["MALE"] = "male";
    GenderType["FEMALE"] = "female";
    GenderType["OTHER"] = "other";
    GenderType["PREFER_NOT_TO_SAY"] = "prefer_not_to_say";
})(GenderType || (exports.GenderType = GenderType = {}));
var CivilityType;
(function (CivilityType) {
    CivilityType["MR"] = "mr";
    CivilityType["MRS"] = "mrs";
    CivilityType["MS"] = "ms";
    CivilityType["DR"] = "dr";
    CivilityType["PROF"] = "prof";
})(CivilityType || (exports.CivilityType = CivilityType = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "single";
    MaritalStatus["MARRIED"] = "married";
    MaritalStatus["DIVORCED"] = "divorced";
    MaritalStatus["WIDOWED"] = "widowed";
    MaritalStatus["SEPARATED"] = "separated";
    MaritalStatus["PACS"] = "pacs";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var SalaryFrequency;
(function (SalaryFrequency) {
    SalaryFrequency["MONTHLY"] = "monthly";
    SalaryFrequency["BIWEEKLY"] = "biweekly";
    SalaryFrequency["WEEKLY"] = "weekly";
    SalaryFrequency["ANNUAL"] = "annual";
})(SalaryFrequency || (exports.SalaryFrequency = SalaryFrequency = {}));
var ShiftType;
(function (ShiftType) {
    ShiftType["DAY"] = "day";
    ShiftType["NIGHT"] = "night";
    ShiftType["ROTATING"] = "rotating";
    ShiftType["FLEXIBLE"] = "flexible";
})(ShiftType || (exports.ShiftType = ShiftType = {}));
var MarriageRegime;
(function (MarriageRegime) {
    MarriageRegime["COMMUNITY"] = "community";
    MarriageRegime["SEPARATION"] = "separation";
    MarriageRegime["PARTICIPATION"] = "participation";
    MarriageRegime["UNIVERSAL_COMMUNITY"] = "universal_community";
})(MarriageRegime || (exports.MarriageRegime = MarriageRegime = {}));
let Employee = class Employee {
    generateEmployeeCode() {
        if (!this.employee_code) {
            this.employee_code = 'EMP' + Date.now().toString().slice(-7);
        }
    }
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, required: false }),
    __metadata("design:type", user_entity_1.User)
], Employee.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_code', unique: true }),
    (0, swagger_1.ApiProperty)({ example: 'EMP001' }),
    __metadata("design:type", String)
], Employee.prototype, "employee_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "employee_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CivilityType, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "civility", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], Employee.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], Employee.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "middle_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_name', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "preferred_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: GenderType, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_of_birth', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'place_of_birth', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "place_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marital_status', type: 'enum', enum: MaritalStatus, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "marital_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spouse_name', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "spouse_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marriage_regime', type: 'enum', enum: MarriageRegime, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "marriage_regime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_dependents', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Employee.prototype, "number_of_dependents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_id_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "national_id_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passport_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "passport_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passport_expiration_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "passport_expiration_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'social_security_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "social_security_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "tax_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'personal_email', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "personal_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_email', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "work_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'personal_phone', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "personal_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_phone', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "work_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line1', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line2', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_or_province', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "state_or_province", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "country_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_title' }),
    __metadata("design:type", String)
], Employee.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_level', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "job_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (dept) => dept.employees, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_id', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "establishment_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => establishment_entity_1.Establishment, (est) => est.employees, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'establishment_id' }),
    __metadata("design:type", establishment_entity_1.Establishment)
], Employee.prototype, "establishment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'employee_status',
        type: 'enum',
        enum: EmployeeStatus,
        default: EmployeeStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Employee.prototype, "employee_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'employment_type',
        type: 'enum',
        enum: EmploymentType,
        default: EmploymentType.PERMANENT,
    }),
    __metadata("design:type", String)
], Employee.prototype, "employment_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employment_start_date', type: 'date' }),
    __metadata("design:type", String)
], Employee.prototype, "employment_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employment_end_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "employment_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_location', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "work_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_mode', type: 'enum', enum: WorkMode, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "work_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'manager_employee_code', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "manager_employee_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'probation_start_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "probation_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'probation_end_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "probation_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours_per_week', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "working_hours_per_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_days_per_week', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "working_days_per_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shift_type', type: 'enum', enum: ShiftType, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "shift_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_eligible', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "overtime_eligible", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'worker_category', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "worker_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_payment_method', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "preferred_payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_money_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "mobile_money_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_money_provider', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "mobile_money_provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Employee.prototype, "base_salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_frequency', type: 'enum', enum: SalaryFrequency, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "salary_frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_currency', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "salary_currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_effective_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "salary_effective_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bonus_eligible', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "bonus_eligible", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'benefits_eligible', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "benefits_eligible", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'health_insurance_provider', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "health_insurance_provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pension_plan', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "pension_plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'insurance_policy_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "insurance_policy_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'benefit_start_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "benefit_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_id', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "bank_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_number', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "bank_account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_iban', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "bank_iban", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_bic', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "bank_bic", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hire_source', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "hire_source", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'performance_rating', type: 'decimal', precision: 3, scale: 1, nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "performance_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'career_level', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "career_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'succession_eligible', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Employee.prototype, "succession_eligible", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'education_level', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "education_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "diploma", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'diploma_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "diploma_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'education_institution', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "education_institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'disability_status', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "disability_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medical_restrictions', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "medical_restrictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_medical_check_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "last_medical_check_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact_name', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "emergency_contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact_phone', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "emergency_contact_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact_relationship', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "emergency_contact_relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_url', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Employee.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Employee.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Employee.prototype, "generateEmployeeCode", null);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map