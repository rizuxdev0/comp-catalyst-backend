import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PayrollService } from './payroll.service';
import { PaySlip, PaySlipStatus } from './entities/payslip.entity';
import { DeductionStatus, ApprovalStatus } from './entities/salary-deduction.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('payroll')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Permissions('payroll.create')
  @Post('generate-draft')
  @ApiOperation({ summary: 'Generate a draft payslip for an employee' })
  @ApiResponse({ status: 201, type: PaySlip })
  async generateDraft(
    @Body('employeeId') employeeId: string,
    @Body('month') month: number,
    @Body('year') year: number,
  ) {
    return this.payrollService.generateDraft(employeeId, month, year);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Permissions('payroll.create')
  @Post('generate-bulk')
  @ApiOperation({ summary: 'Generate bulk draft payslips for all active employees' })
  @ApiResponse({ status: 201 })
  async generateBulk(
    @Body('month') month: number,
    @Body('year') year: number,
    @Body('departmentId') departmentId?: string,
  ) {
    return this.payrollService.generateBulk(month, year, departmentId);
  }

  @Get('payslips')
  @ApiOperation({ summary: 'List payslips with filters' })
  @ApiQuery({ name: 'employeeId', required: false })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'status', enum: PaySlipStatus, required: false })
  @ApiResponse({ status: 200, type: [PaySlip] })
  async findAll(
    @Query('employeeId') employeeId?: string,
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('status') status?: PaySlipStatus,
  ) {
    const filters: any = {};
    if (employeeId) filters.employeeId = employeeId;
    if (month) filters.periodMonth = month;
    if (year) filters.periodYear = year;
    if (status) filters.status = status;
    return this.payrollService.findAll(filters);
  }

  @Get('payslips/me')
  @ApiOperation({ summary: 'Get current user payslips' })
  @ApiResponse({ status: 200, type: [PaySlip] })
  async findMyPayslips(@Request() req, @Query('year') year?: number) {
    const filters: any = { employeeId: req.user.id }; // Simplified mock, would link via Employee
    if (year) filters.periodYear = year;
    return this.payrollService.findAll(filters);
  }

  @Get('payslips/:id')
  @ApiOperation({ summary: 'Get a single payslip details' })
  @ApiResponse({ status: 200, type: PaySlip })
  async findOne(@Param('id') id: string) {
    return this.payrollService.findOne(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('payslips/:id/validate')
  @ApiOperation({ summary: 'Validate a draft payslip' })
  async validate(@Param('id') id: string, @Request() req) {
    return this.payrollService.validate(id, req.user.id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('premium-types')
  @ApiOperation({ summary: 'List all premium types' })
  async findAllPremiumTypes() {
    // This would ideally be in the service
    return this.payrollService['premiumTypeRepository'].find();
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('employee-premiums')
  @ApiOperation({ summary: 'List employee premiums with filters' })
  @ApiQuery({ name: 'employeeId', required: false })
  async findEmployeePremiums(@Query('employeeId') employeeId?: string) {
    const where = employeeId ? { employeeId } : {};
    return this.payrollService['employeePremiumRepository'].find({
      where,
      relations: ['premiumType'],
    });
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('employee-premium')
  @ApiOperation({ summary: 'Assign a premium to an employee' })
  async createEmployeePremium(@Body() data: any) {
    return this.payrollService['employeePremiumRepository'].save(
      this.payrollService['employeePremiumRepository'].create(data)
    );
  }

  @Roles(AppRole.ADMIN)
  @Patch('payslips/:id/pay')
  @ApiOperation({ summary: 'Mark a payslip as paid' })
  async pay(@Param('id') id: string) {
    return this.payrollService.markAsPaid(id);
  }

  @Roles(AppRole.ADMIN)
  @Patch('employee-premium/:id')
  @ApiOperation({ summary: 'Update an employee premium' })
  async updateEmployeePremium(@Param('id') id: string, @Body() data: any) {
    await this.payrollService['employeePremiumRepository'].update(id, data);
    return this.payrollService['employeePremiumRepository'].findOne({ where: { id } });
  }

  @Get('deductions')
  @ApiOperation({ summary: 'List all salary deductions with filters' })
  @ApiQuery({ name: 'employeeId', required: false })
  async findAllDeductions(@Query('employeeId') employeeId?: string) {
    const where = employeeId ? { employeeId } : {};
    return this.payrollService['deductionRepository'].find({
      where,
      relations: ['employee'],
    });
  }

  @Post('deduction')
  @ApiOperation({ summary: 'Submit a new salary deduction (advance, loan, etc.)' })
  async createDeduction(@Body() data: any) {
    return this.payrollService['deductionRepository'].save(
      this.payrollService['deductionRepository'].create({
        ...data,
        remainingAmount: data.totalAmount, // Initialement égal au total
      })
    );
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('deduction/:id/approve')
  @ApiOperation({ summary: 'Approve a deduction request' })
  async approveDeduction(@Param('id') id: string, @Request() req) {
    await this.payrollService['deductionRepository'].update(id, {
      approvalStatus: ApprovalStatus.APPROVED,
      approvedBy: req.user.id,
      approvedAt: new Date(),
      status: DeductionStatus.ACTIVE,
    } as any);
    return this.payrollService['deductionRepository'].findOne({ where: { id } });
  }

  // ===================== ON-CALL =====================

  @Post('on-call')
  @ApiOperation({ summary: 'Log on-call duty hours' })
  async createOnCall(@Body() data: any) {
    return this.payrollService.createOnCallDuty(data);
  }

  @Get('on-call')
  @ApiOperation({ summary: 'List on-call duties' })
  async findOnCall(@Query('employeeId') employeeId?: string) {
    return this.payrollService.findOnCallDuties(employeeId);
  }

  // ===================== PERFORMANCE BONUSES =====================

  @Post('bonus')
  @ApiOperation({ summary: 'Create a performance bonus' })
  async createBonus(@Body() data: any) {
    return this.payrollService.createPerformanceBonus(data);
  }

  @Get('performance-bonuses')
  @ApiOperation({ summary: 'List performance bonuses' })
  async findBonuses(@Query('employeeId') employeeId?: string) {
    return this.payrollService.findPerformanceBonuses(employeeId);
  }
}
