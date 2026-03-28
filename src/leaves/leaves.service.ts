import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';
import { ApprovalsService } from '../approvals/approvals.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(LeaveRequest)
    private requestRepository: Repository<LeaveRequest>,
    @InjectRepository(LeaveType)
    private typeRepository: Repository<LeaveType>,
    @InjectRepository(LeaveBalance)
    private balanceRepository: Repository<LeaveBalance>,
    @InjectRepository(CompanySettings)
    private companySettingsRepository: Repository<CompanySettings>,
    private approvalsService: ApprovalsService,
    private dataSource: DataSource,
    private auditService: AuditService,
  ) {}

  async findAllTypes(): Promise<LeaveType[]> {
    return this.typeRepository.find({ where: { isActive: true } });
  }

  async findMyRequests(employeeId: string): Promise<LeaveRequest[]> {
    return this.requestRepository.find({
      where: { employeeId },
      relations: ['leaveType'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllRequests(status?: LeaveRequestStatus): Promise<LeaveRequest[]> {
    const where = status ? { status } : {};
    return this.requestRepository.find({
      where,
      relations: ['employee', 'leaveType'],
      order: { createdAt: 'DESC' },
    });
  }

  async getBalances(employeeId: string, year: number): Promise<LeaveBalance[]> {
    return this.balanceRepository.find({
      where: { employeeId, year },
      relations: ['leaveType'],
    });
  }

  async createRequest(employeeId: string, data: Partial<LeaveRequest>): Promise<LeaveRequest> {
    const { leaveTypeId, startDate, endDate, daysCount } = data;
    const year = new Date(startDate).getFullYear();

    // 1. Check balance
    const balance = await this.balanceRepository.findOne({
      where: { employeeId, leaveTypeId, year },
    });

    if (!balance && data.leaveType?.isPaid) {
      throw new BadRequestException('No leave balance found for this year');
    }

    if (balance && (Number(balance.entitledDays) + Number(balance.carriedOverDays) - Number(balance.takenDays) - Number(balance.pendingDays)) < daysCount) {
      throw new BadRequestException('Insufficient leave balance');
    }

    // 2. Create request in transaction
    return this.dataSource.transaction(async (manager) => {
      const request = manager.create(LeaveRequest, {
        ...data,
        employeeId,
        status: LeaveRequestStatus.PENDING,
      });

      const savedRequest = await manager.save(request);

      if (balance) {
        balance.pendingDays = Number(balance.pendingDays) + Number(daysCount);
        await manager.save(balance);
      }

      // Check approval mode
      const settings = await manager.findOne(CompanySettings, { where: {} });
      if (settings?.leave_approval_mode === 'workflow') {
        const leaveType = await manager.findOne(LeaveType, { where: { id: leaveTypeId } });
        await this.approvalsService.createRequest({
          module: 'leaves',
          entityId: savedRequest.id,
          entityLabel: `Demande de ${leaveType?.name || 'congé'} : ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
          requesterId: employeeId,
        });
      }

      await this.auditService.log({
        action: 'create',
        entityType: 'leave_request',
        entityId: savedRequest.id,
        entityName: `Demande de congé - ${employeeId}`,
        newValues: data,
      });

      return savedRequest;
    });
  }

  async approveRequest(id: string, approvedBy: string): Promise<LeaveRequest> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['leaveType'],
    });

    if (!request || request.status !== LeaveRequestStatus.PENDING) {
      throw new BadRequestException('Invalid request or already processed');
    }

    return this.dataSource.transaction(async (manager) => {
      request.status = LeaveRequestStatus.APPROVED;
      request.approvedBy = approvedBy;
      request.approvedAt = new Date();

      const year = new Date(request.startDate).getFullYear();
      const balance = await manager.findOne(LeaveBalance, {
        where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
      });

      if (balance) {
        balance.pendingDays = Number(balance.pendingDays) - Number(request.daysCount);
        balance.takenDays = Number(balance.takenDays) + Number(request.daysCount);
        await manager.save(balance);
      }

      const saved = await manager.save(request);

      await this.auditService.log({
        action: 'approve',
        entityType: 'leave_request',
        entityId: id,
        entityName: `Approbation congé ${id}`,
        oldValues: { status: 'PENDING' },
        newValues: { status: 'APPROVED', approvedBy },
        userId: approvedBy,
      });

      return saved;
    });
  }

  async rejectRequest(id: string, reason: string): Promise<LeaveRequest> {
    const request = await this.requestRepository.findOne({ where: { id } });

    if (!request || request.status !== LeaveRequestStatus.PENDING) {
      throw new BadRequestException('Invalid request or already processed');
    }

    return this.dataSource.transaction(async (manager) => {
      request.status = LeaveRequestStatus.REJECTED;
      request.rejectionReason = reason;

      const year = new Date(request.startDate).getFullYear();
      const balance = await manager.findOne(LeaveBalance, {
        where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
      });

      if (balance) {
        balance.pendingDays = Number(balance.pendingDays) - Number(request.daysCount);
        await manager.save(balance);
      }

      const saved = await manager.save(request);

      await this.auditService.log({
        action: 'reject',
        entityType: 'leave_request',
        entityId: id,
        entityName: `Rejet congé ${id}`,
        oldValues: { status: 'PENDING' },
        newValues: { status: 'REJECTED', rejectionReason: reason },
      });

      return saved;
    });
  }
}
