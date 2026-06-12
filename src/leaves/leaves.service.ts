import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';
import { ApprovalsService } from '../approvals/approvals.service';
import { AuditService } from '../audit/audit.service';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employee.entity';

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
    private employeesService: EmployeesService,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    await this.seedTypes();
  }

  private async seedTypes() {
    const defaultTypes = [
      { code: 'PAID', name: 'Congés Payés', defaultDays: 25, isPaid: true, isActive: true, color: '#3B82F6' },
      { code: 'SICK', name: 'Maladie', defaultDays: 0, isPaid: true, requiresJustification: true, isActive: true, color: '#EF4444' },
      { code: 'MATERNITY', name: 'Maternité', defaultDays: 90, isPaid: true, requiresJustification: true, isActive: true, color: '#EC4899' },
      { code: 'PATERNITY', name: 'Paternité', defaultDays: 10, isPaid: true, requiresJustification: true, isActive: true, color: '#8B5CF6' },
      { code: 'UNPAID', name: 'Sans Solde', defaultDays: 0, isPaid: false, isActive: true, color: '#6B7280' },
      { code: 'SPECIAL', name: 'Événements Spéciaux', defaultDays: 3, isPaid: true, requiresJustification: true, isActive: true, color: '#F59E0B' },
      { code: 'PERSONAL', name: 'Raison personnelle', defaultDays: 0, isPaid: true, requiresJustification: true, isActive: true, color: '#9CA3AF' },
    ];

    for (const type of defaultTypes) {
      const exists = await this.typeRepository.findOne({ where: { code: type.code } });
      if (!exists) {
        await this.typeRepository.save(this.typeRepository.create(type));
      }
    }
  }

  async findAllTypes(): Promise<LeaveType[]> {
    return this.typeRepository.find({ where: { isActive: true } });
  }

  async findMyRequests(userId: string): Promise<LeaveRequest[]> {
    const employee = await this.employeesService.findByUserId(userId);
    if (!employee) return [];
    
    return this.requestRepository.find({
      where: { employeeId: employee.id },
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

  async createRequest(userId: string, data: Partial<LeaveRequest>): Promise<LeaveRequest> {
    const employee = await this.employeesService.findByUserId(userId);
    if (!employee) throw new NotFoundException('Profil employé non trouvé');
    const employeeId = employee.id;

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
      const leaveType = await manager.findOne(LeaveType, { where: { id: leaveTypeId } });
      
      if (settings?.leave_approval_mode === 'workflow') {
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

      // Fetch Admins and Managers to notify
      try {
        const managersAndAdmins = await manager.query(
          "SELECT id FROM users WHERE role IN ('admin', 'manager')"
        );
        this.eventEmitter.emit('leave.created', {
          adminIds: managersAndAdmins.map((u: any) => u.id),
          employeeName: `${employee.first_name} ${employee.last_name}`,
          leaveType: leaveType?.name || 'Congé',
          startDate: startDate,
        });
      } catch (e) {
        console.error('Failed to dispatch leave.created event', e);
      }

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

      // Notify employee
      const employee = await manager.findOne(Employee, { where: { id: saved.employeeId } });
      if (employee?.userId) {
        this.eventEmitter.emit('leave.updated', {
          userId: employee.userId,
          status: 'approved',
          leaveType: request.leaveType?.name || 'Congé',
          startDate: request.startDate,
        });
      }

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

      // Notify employee
      const employee = await manager.findOne(Employee, { where: { id: saved.employeeId } });
      if (employee?.userId) {
        this.eventEmitter.emit('leave.updated', {
          userId: employee.userId,
          status: 'rejected',
          leaveType: 'Congé', // Would need to load leaveType if not loaded
          startDate: request.startDate,
        });
      }

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

  async createType(data: Partial<LeaveType>): Promise<LeaveType> {
    const type = this.typeRepository.create(data);
    return this.typeRepository.save(type);
  }

  async updateType(id: string, data: Partial<LeaveType>): Promise<LeaveType> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) throw new NotFoundException('Type de congé non trouvé');
    
    // Convert named fields if coming from frontend format
    const toUpdate = {
      ...data,
      defaultDays: (data as any).default_days !== undefined ? (data as any).default_days : data.defaultDays,
      isPaid: (data as any).is_paid !== undefined ? (data as any).is_paid : data.isPaid,
      requiresJustification: (data as any).requires_justification !== undefined ? (data as any).requires_justification : data.requiresJustification,
      isActive: (data as any).is_active !== undefined ? (data as any).is_active : data.isActive,
    };

    Object.assign(type, toUpdate);
    return this.typeRepository.save(type);
  }

  async deleteType(id: string): Promise<void> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) throw new NotFoundException('Type de congé non trouvé');
    await this.typeRepository.delete(id);
  }

  async cancelRequest(id: string, userId: string): Promise<void> {
    const employee = await this.employeesService.findByUserId(userId);
    if (!employee) throw new NotFoundException('Employé non trouvé');

    const request = await this.requestRepository.findOne({ 
      where: { id, employeeId: employee.id } 
    });

    if (!request) throw new NotFoundException('Demande non trouvée');
    if (request.status !== LeaveRequestStatus.PENDING) {
      throw new BadRequestException('Seules les demandes en attente peuvent être annulées');
    }

    await this.dataSource.transaction(async (manager) => {
      // Si la demande est annulée, on recrédite les jours en attente dans la balance
      const year = new Date(request.startDate).getFullYear();
      const balance = await manager.findOne(LeaveBalance, {
        where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
      });

      if (balance) {
        balance.pendingDays = Math.max(0, Number(balance.pendingDays) - Number(request.daysCount));
        await manager.save(balance);
      }

      // Au lieu de supprimer on change le statut
      request.status = LeaveRequestStatus.CANCELLED;
      await manager.save(request);

      await this.auditService.log({
        action: 'cancel',
        entityType: 'leave_request',
        entityId: id,
        entityName: `Annulation demande congé par l'employé`,
        oldValues: { status: LeaveRequestStatus.PENDING },
        newValues: { status: LeaveRequestStatus.CANCELLED },
        userId: userId,
      });
    });
  }
}
