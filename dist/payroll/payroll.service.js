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
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payslip_entity_1 = require("./entities/payslip.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const audit_service_1 = require("../audit/audit.service");
const premium_type_entity_1 = require("./entities/premium-type.entity");
const employee_premium_entity_1 = require("./entities/employee-premium.entity");
const salary_deduction_entity_1 = require("./entities/salary-deduction.entity");
const company_settings_entity_1 = require("../settings/entities/company-settings.entity");
let PayrollService = class PayrollService {
    constructor(payslipRepository, employeeRepository, premiumTypeRepository, employeePremiumRepository, deductionRepository, settingsRepository, auditService) {
        this.payslipRepository = payslipRepository;
        this.employeeRepository = employeeRepository;
        this.premiumTypeRepository = premiumTypeRepository;
        this.employeePremiumRepository = employeePremiumRepository;
        this.deductionRepository = deductionRepository;
        this.settingsRepository = settingsRepository;
        this.auditService = auditService;
    }
    async generateDraft(employeeId, month, year) {
        const settings = await this.settingsRepository.findOne({ where: {} }) || {
            employee_contribution_rate: 4.0,
            csg_crds_rate: 0,
        };
        const existing = await this.payslipRepository.findOne({
            where: { employeeId, periodMonth: month, periodYear: year },
        });
        if (existing) {
            throw new common_1.BadRequestException('Payslip already exists for this period');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const activePremiums = await this.employeePremiumRepository.find({
            where: { employeeId, isActive: true },
            relations: ['premiumType'],
        });
        const premiumsDetail = activePremiums.map(p => ({
            label: p.premiumType.name,
            amount: Number(p.amount),
            isTaxable: p.premiumType.isTaxable,
        }));
        const totalPremiums = premiumsDetail.reduce((sum, p) => sum + p.amount, 0);
        const activeDeductions = await this.deductionRepository.find({
            where: { employeeId, status: salary_deduction_entity_1.DeductionStatus.ACTIVE, approvalStatus: salary_deduction_entity_1.ApprovalStatus.APPROVED },
        });
        const deductionsDetail = activeDeductions.map(d => ({
            label: d.description || d.type,
            amount: Number(d.amountPerMonth),
            type: d.type,
        }));
        const baseSalary = Number(employee.base_salary);
        const socRate = Number(settings.employee_contribution_rate || 0) / 100;
        const csgRate = Number(settings.csg_crds_rate || 0) / 100;
        if (socRate > 0) {
            deductionsDetail.push({
                label: 'Cotisation Sociale Salariale',
                amount: baseSalary * socRate,
                type: 'social'
            });
        }
        if (csgRate > 0) {
            deductionsDetail.push({
                label: 'CSG/CRDS',
                amount: baseSalary * csgRate,
                type: 'tax'
            });
        }
        const incomeTax = baseSalary * 0.05;
        deductionsDetail.push({ label: 'Retenue IR (estimé)', amount: incomeTax, type: 'tax' });
        const totalDeductions = deductionsDetail.reduce((sum, d) => sum + d.amount, 0);
        const employerDetail = [];
        const empSocRate = Number(settings.employer_contribution_rate || 0) / 100;
        if (empSocRate > 0) {
            employerDetail.push({
                label: 'Cotisation Sociale Patronale',
                amount: baseSalary * empSocRate,
            });
        }
        const grossSalary = baseSalary + totalPremiums;
        const netSalary = grossSalary - totalDeductions;
        const payslip = this.payslipRepository.create({
            employeeId,
            periodMonth: month,
            periodYear: year,
            baseSalary,
            grossSalary,
            netSalary,
            totalPremiums,
            totalDeductions,
            premiumsDetail,
            deductionsDetail,
            employerDetail,
            status: payslip_entity_1.PaySlipStatus.DRAFT,
        });
        const saved = await this.payslipRepository.save(payslip);
        await this.auditService.log({
            action: 'create',
            entityType: 'payslip',
            entityId: saved.id,
            entityName: `Bulletin ${month}/${year} - ${employee.first_name || employee.id}`,
            newValues: { month, year, netSalary },
        });
        return saved;
    }
    async generateBulk(month, year, departmentId) {
        const query = this.employeeRepository.createQueryBuilder('employee')
            .where('employee.employee_status = :status', { status: 'active' });
        if (departmentId) {
            query.andWhere('employee.department_id = :deptId', { deptId: departmentId });
        }
        const activeEmployees = await query.getMany();
        const results = {
            total: activeEmployees.length,
            generated: 0,
            skipped: 0,
            errors: 0,
        };
        for (const employee of activeEmployees) {
            try {
                await this.generateDraft(employee.id, month, year);
                results.generated++;
            }
            catch (error) {
                if (error instanceof common_1.BadRequestException) {
                    results.skipped++;
                }
                else {
                    results.errors++;
                    console.error(`Error generating payslip for ${employee.id}:`, error);
                }
            }
        }
        return results;
    }
    async findAll(filters) {
        return this.payslipRepository.find({
            where: filters,
            relations: ['employee'],
            order: { periodYear: 'DESC', periodMonth: 'DESC' },
        });
    }
    async findOne(id) {
        const payslip = await this.payslipRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!payslip)
            throw new common_1.NotFoundException('Payslip not found');
        return payslip;
    }
    async validate(id, userId) {
        const payslip = await this.findOne(id);
        if (payslip.status !== payslip_entity_1.PaySlipStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft payslips can be validated');
        }
        payslip.status = payslip_entity_1.PaySlipStatus.VALIDATED;
        payslip.validatedBy = userId;
        payslip.validatedAt = new Date();
        const saved = await this.payslipRepository.save(payslip);
        await this.auditService.log({
            userId,
            action: 'approve',
            entityType: 'payslip',
            entityId: id,
            entityName: `Validation bulletin ${payslip.periodMonth}/${payslip.periodYear}`,
        });
        return saved;
    }
    async markAsPaid(id) {
        const payslip = await this.findOne(id);
        if (payslip.status !== payslip_entity_1.PaySlipStatus.VALIDATED) {
            throw new common_1.BadRequestException('Only validated payslips can be marked as paid');
        }
        payslip.status = payslip_entity_1.PaySlipStatus.PAID;
        payslip.paidAt = new Date();
        return this.payslipRepository.save(payslip);
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payslip_entity_1.PaySlip)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(premium_type_entity_1.PremiumType)),
    __param(3, (0, typeorm_1.InjectRepository)(employee_premium_entity_1.EmployeePremium)),
    __param(4, (0, typeorm_1.InjectRepository)(salary_deduction_entity_1.SalaryDeduction)),
    __param(5, (0, typeorm_1.InjectRepository)(company_settings_entity_1.CompanySettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        audit_service_1.AuditService])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map