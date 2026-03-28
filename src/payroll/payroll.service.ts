import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaySlip, PaySlipStatus } from './entities/payslip.entity';
import { Employee } from '../employees/entities/employee.entity';
import { AuditService } from '../audit/audit.service';
import { PremiumType } from './entities/premium-type.entity';
import { EmployeePremium } from './entities/employee-premium.entity';
import { SalaryDeduction, DeductionStatus, ApprovalStatus } from './entities/salary-deduction.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(PaySlip)
    private payslipRepository: Repository<PaySlip>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(PremiumType)
    private premiumTypeRepository: Repository<PremiumType>,
    @InjectRepository(EmployeePremium)
    private employeePremiumRepository: Repository<EmployeePremium>,
    @InjectRepository(SalaryDeduction)
    private deductionRepository: Repository<SalaryDeduction>,
    @InjectRepository(CompanySettings)
    private settingsRepository: Repository<CompanySettings>,
    private auditService: AuditService,
  ) {}

  async generateDraft(employeeId: string, month: number, year: number): Promise<PaySlip> {
    // 0. Get Company Settings
    const settings = await this.settingsRepository.findOne({ where: {} }) || {
      employee_contribution_rate: 4.0,
      csg_crds_rate: 0,
    };
    // 1. Check if already exists
    const existing = await this.payslipRepository.findOne({
      where: { employeeId, periodMonth: month, periodYear: year },
    });
    if (existing) {
      throw new BadRequestException('Payslip already exists for this period');
    }

    // 2. Get Employee and their base salary
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      // relations: ['contracts'], // On pourrait récupérer le contrat actif
    });
    if (!employee) throw new NotFoundException('Employee not found');

    // 3. Get Active Premiums for this period
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

    // 4. Get Active Deductions for this period
    const activeDeductions = await this.deductionRepository.find({
      where: { employeeId, status: DeductionStatus.ACTIVE, approvalStatus: ApprovalStatus.APPROVED },
    });

    const deductionsDetail = activeDeductions.map(d => ({
      label: d.description || d.type,
      amount: Number(d.amountPerMonth),
      type: d.type,
    }));

    const baseSalary = Number(employee.base_salary);
    
    // Social contributions from Settings
    const socRate = Number((settings as any).employee_contribution_rate || 0) / 100;
    const csgRate = Number((settings as any).csg_crds_rate || 0) / 100;

    if (socRate > 0) {
      deductionsDetail.push({ 
        label: 'Cotisation Sociale Salariale', 
        amount: baseSalary * socRate, 
        type: 'social' as any 
      });
    }

    if (csgRate > 0) {
      deductionsDetail.push({ 
        label: 'CSG/CRDS', 
        amount: baseSalary * csgRate, 
        type: 'tax' as any 
      });
    }

    // Tax estimation (Income tax)
    const incomeTax = baseSalary * 0.05; // Fixed 5% for now or could use CountryTaxSetting
    deductionsDetail.push({ label: 'Retenue IR (estimé)', amount: incomeTax, type: 'tax' as any });
    
    const totalDeductions = deductionsDetail.reduce((sum, d) => sum + d.amount, 0);

    // Employer Charges
    const employerDetail = [];
    const empSocRate = Number((settings as any).employer_contribution_rate || 0) / 100;
    if (empSocRate > 0) {
      employerDetail.push({
        label: 'Cotisation Sociale Patronale',
        amount: baseSalary * empSocRate,
      });
    }

    // 5. Calculate Final
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
      employerDetail, // New field
      status: PaySlipStatus.DRAFT,
    });

    const saved = await this.payslipRepository.save(payslip);

    // AUDIT LOG
    await this.auditService.log({
      action: 'create',
      entityType: 'payslip',
      entityId: saved.id,
      entityName: `Bulletin ${month}/${year} - ${employee.first_name || employee.id}`,
      newValues: { month, year, netSalary },
    });

    return saved;
  }

  async generateBulk(month: number, year: number, departmentId?: string): Promise<any> {
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
      } catch (error) {
        if (error instanceof BadRequestException) {
          results.skipped++;
        } else {
          results.errors++;
          console.error(`Error generating payslip for ${employee.id}:`, error);
        }
      }
    }

    return results;
  }

  async findAll(filters: any): Promise<PaySlip[]> {
    return this.payslipRepository.find({
      where: filters,
      relations: ['employee'],
      order: { periodYear: 'DESC', periodMonth: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PaySlip> {
    const payslip = await this.payslipRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!payslip) throw new NotFoundException('Payslip not found');
    return payslip;
  }

  async validate(id: string, userId: string): Promise<PaySlip> {
    const payslip = await this.findOne(id);
    if (payslip.status !== PaySlipStatus.DRAFT) {
      throw new BadRequestException('Only draft payslips can be validated');
    }
    payslip.status = PaySlipStatus.VALIDATED;
    payslip.validatedBy = userId;
    payslip.validatedAt = new Date();
    const saved = await this.payslipRepository.save(payslip);

    // AUDIT LOG
    await this.auditService.log({
      userId,
      action: 'approve',
      entityType: 'payslip',
      entityId: id,
      entityName: `Validation bulletin ${payslip.periodMonth}/${payslip.periodYear}`,
    });

    return saved;
  }

  async markAsPaid(id: string): Promise<PaySlip> {
    const payslip = await this.findOne(id);
    if (payslip.status !== PaySlipStatus.VALIDATED) {
      throw new BadRequestException('Only validated payslips can be marked as paid');
    }
    payslip.status = PaySlipStatus.PAID;
    payslip.paidAt = new Date();
    return this.payslipRepository.save(payslip);
  }
}
