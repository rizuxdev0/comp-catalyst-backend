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
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payslip_entity_1 = require("./entities/payslip.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const audit_service_1 = require("../audit/audit.service");
const premium_type_entity_1 = require("./entities/premium-type.entity");
const employee_premium_entity_1 = require("./entities/employee-premium.entity");
const salary_deduction_entity_1 = require("./entities/salary-deduction.entity");
const company_settings_entity_1 = require("../settings/entities/company-settings.entity");
const on_call_duty_entity_1 = require("./entities/on-call-duty.entity");
const performance_bonus_entity_1 = require("./entities/performance-bonus.entity");
let PayrollService = class PayrollService {
    constructor(payslipRepository, employeeRepository, premiumTypeRepository, employeePremiumRepository, deductionRepository, settingsRepository, onCallDutyRepository, performanceBonusRepository, auditService, eventEmitter) {
        this.payslipRepository = payslipRepository;
        this.employeeRepository = employeeRepository;
        this.premiumTypeRepository = premiumTypeRepository;
        this.employeePremiumRepository = employeePremiumRepository;
        this.deductionRepository = deductionRepository;
        this.settingsRepository = settingsRepository;
        this.onCallDutyRepository = onCallDutyRepository;
        this.performanceBonusRepository = performanceBonusRepository;
        this.auditService = auditService;
        this.eventEmitter = eventEmitter;
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
        const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
        const endDate = new Date(year, month, 0).toISOString().split('T')[0];
        const onCallDuties = await this.onCallDutyRepository.find({
            where: {
                employeeId,
                isPaid: false,
                date: (0, typeorm_2.Between)(startDate, endDate)
            }
        });
        for (const oc of onCallDuties) {
            premiumsDetail.push({
                label: `Astreinte (${oc.type}) - ${oc.date}`,
                amount: Number(oc.amount),
                isTaxable: true,
            });
        }
        const bonuses = await this.performanceBonusRepository.find({
            where: { employeeId, isPaid: false, period: `${year}-${month}` }
        });
        for (const b of bonuses) {
            premiumsDetail.push({
                label: `Prime: ${b.title}`,
                amount: Number(b.finalAmount),
                isTaxable: true,
            });
        }
        const updatedTotalPremiums = premiumsDetail.reduce((sum, p) => sum + p.amount, 0);
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
        const grossSalary = baseSalary + updatedTotalPremiums;
        const netSalary = grossSalary - totalDeductions;
        const payslip = this.payslipRepository.create({
            employeeId,
            periodMonth: month,
            periodYear: year,
            baseSalary,
            grossSalary,
            netSalary,
            totalPremiums: updatedTotalPremiums,
            totalDeductions,
            premiumsDetail,
            deductionsDetail,
            employerDetail,
            establishmentId: employee.establishment_id,
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
        const startDate = new Date(payslip.periodYear, payslip.periodMonth - 1, 1).toISOString().split('T')[0];
        const endDate = new Date(payslip.periodYear, payslip.periodMonth, 0).toISOString().split('T')[0];
        await this.onCallDutyRepository.update({ employeeId: payslip.employeeId, isPaid: false, date: (0, typeorm_2.Between)(startDate, endDate) }, { isPaid: true, payslipId: saved.id });
        await this.performanceBonusRepository.update({ employeeId: payslip.employeeId, isPaid: false, period: `${payslip.periodYear}-${payslip.periodMonth}` }, { isPaid: true });
        const activeDeductions = await this.deductionRepository.find({
            where: { employeeId: payslip.employeeId, status: salary_deduction_entity_1.DeductionStatus.ACTIVE, approvalStatus: salary_deduction_entity_1.ApprovalStatus.APPROVED },
        });
        for (const d of activeDeductions) {
            const amountPaid = Number(d.amountPerMonth);
            d.remainingAmount = Math.max(0, Number(d.remainingAmount) - amountPaid);
            d.installmentsPaid += 1;
            if (d.remainingAmount <= 0 || d.installmentsPaid >= d.installmentsCount) {
                d.status = salary_deduction_entity_1.DeductionStatus.COMPLETED;
            }
            await this.deductionRepository.save(d);
        }
        if (payslip.employee?.userId) {
            this.eventEmitter.emit('payroll.finalized', {
                userId: payslip.employee.userId,
                month: payslip.periodMonth.toString(),
                year: payslip.periodYear,
            });
        }
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
    async createOnCallDuty(data) {
        const { employeeId, type, hours } = data;
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        const settings = await this.settingsRepository.findOne({ where: {} });
        if (!employee || !settings)
            throw new common_1.BadRequestException('Employee or Settings not found');
        const weeklyContract = Number(employee.working_hours_per_week || 40);
        const weeklyToMonthlyRatio = 4.33;
        const hourlyRate = Number(employee.base_salary) / (weeklyContract * weeklyToMonthlyRatio);
        let multiplier = 1.0;
        if (type === 'night')
            multiplier = Number(settings.night_on_call_rate);
        else if (type === 'weekend')
            multiplier = Number(settings.weekend_on_call_rate);
        else if (type === 'holiday')
            multiplier = Number(settings.holiday_on_call_rate);
        else
            multiplier = 1.0;
        const amount = hours * hourlyRate * (multiplier - 1);
        const oc = this.onCallDutyRepository.create(data);
        oc.amount = Math.round(amount);
        return this.onCallDutyRepository.save(oc);
    }
    async createPerformanceBonus(data) {
        const { baseAmount, achievementPercentage } = data;
        const finalAmount = (Number(baseAmount) * Number(achievementPercentage)) / 100;
        const bonus = this.performanceBonusRepository.create(data);
        bonus.finalAmount = Math.round(finalAmount);
        return this.performanceBonusRepository.save(bonus);
    }
    async findOnCallDuties(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.onCallDutyRepository.find({
            where,
            relations: ['employee'],
            order: { date: 'DESC' },
        });
    }
    async findPerformanceBonuses(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.performanceBonusRepository.find({
            where,
            relations: ['employee'],
            order: { period: 'DESC' },
        });
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
    __param(6, (0, typeorm_1.InjectRepository)(on_call_duty_entity_1.OnCallDuty)),
    __param(7, (0, typeorm_1.InjectRepository)(performance_bonus_entity_1.PerformanceBonus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        audit_service_1.AuditService,
        event_emitter_1.EventEmitter2])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map