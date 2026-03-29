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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const payroll_service_1 = require("./payroll.service");
const payslip_entity_1 = require("./entities/payslip.entity");
const salary_deduction_entity_1 = require("./entities/salary-deduction.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../common/decorators/permissions.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let PayrollController = class PayrollController {
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async generateDraft(employeeId, month, year) {
        return this.payrollService.generateDraft(employeeId, month, year);
    }
    async generateBulk(month, year, departmentId) {
        return this.payrollService.generateBulk(month, year, departmentId);
    }
    async findAll(employeeId, month, year, status) {
        const filters = {};
        if (employeeId)
            filters.employeeId = employeeId;
        if (month)
            filters.periodMonth = month;
        if (year)
            filters.periodYear = year;
        if (status)
            filters.status = status;
        return this.payrollService.findAll(filters);
    }
    async findMyPayslips(req, year) {
        const filters = { employeeId: req.user.id };
        if (year)
            filters.periodYear = year;
        return this.payrollService.findAll(filters);
    }
    async findOne(id) {
        return this.payrollService.findOne(id);
    }
    async validate(id, req) {
        return this.payrollService.validate(id, req.user.id);
    }
    async findAllPremiumTypes() {
        return this.payrollService['premiumTypeRepository'].find();
    }
    async findEmployeePremiums(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.payrollService['employeePremiumRepository'].find({
            where,
            relations: ['premiumType'],
        });
    }
    async createEmployeePremium(data) {
        return this.payrollService['employeePremiumRepository'].save(this.payrollService['employeePremiumRepository'].create(data));
    }
    async pay(id) {
        return this.payrollService.markAsPaid(id);
    }
    async updateEmployeePremium(id, data) {
        await this.payrollService['employeePremiumRepository'].update(id, data);
        return this.payrollService['employeePremiumRepository'].findOne({ where: { id } });
    }
    async findAllDeductions(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.payrollService['deductionRepository'].find({
            where,
            relations: ['employee'],
        });
    }
    async createDeduction(data) {
        return this.payrollService['deductionRepository'].save(this.payrollService['deductionRepository'].create({
            ...data,
            remainingAmount: data.totalAmount,
        }));
    }
    async approveDeduction(id, req) {
        await this.payrollService['deductionRepository'].update(id, {
            approvalStatus: salary_deduction_entity_1.ApprovalStatus.APPROVED,
            approvedBy: req.user.id,
            approvedAt: new Date(),
            status: salary_deduction_entity_1.DeductionStatus.ACTIVE,
        });
        return this.payrollService['deductionRepository'].findOne({ where: { id } });
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, permissions_decorator_1.Permissions)('payroll.create'),
    (0, common_1.Post)('generate-draft'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a draft payslip for an employee' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: payslip_entity_1.PaySlip }),
    __param(0, (0, common_1.Body)('employeeId')),
    __param(1, (0, common_1.Body)('month')),
    __param(2, (0, common_1.Body)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "generateDraft", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, permissions_decorator_1.Permissions)('payroll.create'),
    (0, common_1.Post)('generate-bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate bulk draft payslips for all active employees' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Body)('month')),
    __param(1, (0, common_1.Body)('year')),
    __param(2, (0, common_1.Body)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "generateBulk", null);
__decorate([
    (0, common_1.Get)('payslips'),
    (0, swagger_1.ApiOperation)({ summary: 'List payslips with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: payslip_entity_1.PaySlipStatus, required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payslip_entity_1.PaySlip] }),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('payslips/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user payslips' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payslip_entity_1.PaySlip] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findMyPayslips", null);
__decorate([
    (0, common_1.Get)('payslips/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single payslip details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payslip_entity_1.PaySlip }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('payslips/:id/validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate a draft payslip' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "validate", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('premium-types'),
    (0, swagger_1.ApiOperation)({ summary: 'List all premium types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findAllPremiumTypes", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('employee-premiums'),
    (0, swagger_1.ApiOperation)({ summary: 'List employee premiums with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findEmployeePremiums", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('employee-premium'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a premium to an employee' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createEmployeePremium", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('payslips/:id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a payslip as paid' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "pay", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('employee-premium/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an employee premium' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updateEmployeePremium", null);
__decorate([
    (0, common_1.Get)('deductions'),
    (0, swagger_1.ApiOperation)({ summary: 'List all salary deductions with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findAllDeductions", null);
__decorate([
    (0, common_1.Post)('deduction'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new salary deduction (advance, loan, etc.)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createDeduction", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('deduction/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a deduction request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "approveDeduction", null);
exports.PayrollController = PayrollController = __decorate([
    (0, swagger_1.ApiTags)('payroll'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map