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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_request_entity_1 = require("./entities/leave-request.entity");
const leave_type_entity_1 = require("./entities/leave-type.entity");
const leave_balance_entity_1 = require("./entities/leave-balance.entity");
const company_settings_entity_1 = require("../settings/entities/company-settings.entity");
const approvals_service_1 = require("../approvals/approvals.service");
const audit_service_1 = require("../audit/audit.service");
const employees_service_1 = require("../employees/employees.service");
const employee_entity_1 = require("../employees/entities/employee.entity");
let LeavesService = class LeavesService {
    constructor(requestRepository, typeRepository, balanceRepository, companySettingsRepository, approvalsService, dataSource, auditService, employeesService, eventEmitter) {
        this.requestRepository = requestRepository;
        this.typeRepository = typeRepository;
        this.balanceRepository = balanceRepository;
        this.companySettingsRepository = companySettingsRepository;
        this.approvalsService = approvalsService;
        this.dataSource = dataSource;
        this.auditService = auditService;
        this.employeesService = employeesService;
        this.eventEmitter = eventEmitter;
    }
    async onModuleInit() {
        await this.seedTypes();
    }
    async seedTypes() {
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
    async findAllTypes() {
        return this.typeRepository.find({ where: { isActive: true } });
    }
    async findMyRequests(userId) {
        const employee = await this.employeesService.findByUserId(userId);
        if (!employee)
            return [];
        return this.requestRepository.find({
            where: { employeeId: employee.id },
            relations: ['leaveType'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAllRequests(status) {
        const where = status ? { status } : {};
        return this.requestRepository.find({
            where,
            relations: ['employee', 'leaveType'],
            order: { createdAt: 'DESC' },
        });
    }
    async getBalances(employeeId, year) {
        return this.balanceRepository.find({
            where: { employeeId, year },
            relations: ['leaveType'],
        });
    }
    async createRequest(userId, data) {
        const employee = await this.employeesService.findByUserId(userId);
        if (!employee)
            throw new common_1.NotFoundException('Profil employé non trouvé');
        const employeeId = employee.id;
        const { leaveTypeId, startDate, endDate, daysCount } = data;
        const year = new Date(startDate).getFullYear();
        const balance = await this.balanceRepository.findOne({
            where: { employeeId, leaveTypeId, year },
        });
        if (!balance && data.leaveType?.isPaid) {
            throw new common_1.BadRequestException('No leave balance found for this year');
        }
        if (balance && (Number(balance.entitledDays) + Number(balance.carriedOverDays) - Number(balance.takenDays) - Number(balance.pendingDays)) < daysCount) {
            throw new common_1.BadRequestException('Insufficient leave balance');
        }
        return this.dataSource.transaction(async (manager) => {
            const request = manager.create(leave_request_entity_1.LeaveRequest, {
                ...data,
                employeeId,
                status: leave_request_entity_1.LeaveRequestStatus.PENDING,
            });
            const savedRequest = await manager.save(request);
            if (balance) {
                balance.pendingDays = Number(balance.pendingDays) + Number(daysCount);
                await manager.save(balance);
            }
            const settings = await manager.findOne(company_settings_entity_1.CompanySettings, { where: {} });
            if (settings?.leave_approval_mode === 'workflow') {
                const leaveType = await manager.findOne(leave_type_entity_1.LeaveType, { where: { id: leaveTypeId } });
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
    async approveRequest(id, approvedBy) {
        const request = await this.requestRepository.findOne({
            where: { id },
            relations: ['leaveType'],
        });
        if (!request || request.status !== leave_request_entity_1.LeaveRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Invalid request or already processed');
        }
        return this.dataSource.transaction(async (manager) => {
            request.status = leave_request_entity_1.LeaveRequestStatus.APPROVED;
            request.approvedBy = approvedBy;
            request.approvedAt = new Date();
            const year = new Date(request.startDate).getFullYear();
            const balance = await manager.findOne(leave_balance_entity_1.LeaveBalance, {
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
            });
            if (balance) {
                balance.pendingDays = Number(balance.pendingDays) - Number(request.daysCount);
                balance.takenDays = Number(balance.takenDays) + Number(request.daysCount);
                await manager.save(balance);
            }
            const saved = await manager.save(request);
            const employee = await manager.findOne(employee_entity_1.Employee, { where: { id: saved.employeeId } });
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
    async rejectRequest(id, reason) {
        const request = await this.requestRepository.findOne({ where: { id } });
        if (!request || request.status !== leave_request_entity_1.LeaveRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Invalid request or already processed');
        }
        return this.dataSource.transaction(async (manager) => {
            request.status = leave_request_entity_1.LeaveRequestStatus.REJECTED;
            request.rejectionReason = reason;
            const year = new Date(request.startDate).getFullYear();
            const balance = await manager.findOne(leave_balance_entity_1.LeaveBalance, {
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
            });
            if (balance) {
                balance.pendingDays = Number(balance.pendingDays) - Number(request.daysCount);
                await manager.save(balance);
            }
            const saved = await manager.save(request);
            const employee = await manager.findOne(employee_entity_1.Employee, { where: { id: saved.employeeId } });
            if (employee?.userId) {
                this.eventEmitter.emit('leave.updated', {
                    userId: employee.userId,
                    status: 'rejected',
                    leaveType: 'Congé',
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
    async createType(data) {
        const type = this.typeRepository.create(data);
        return this.typeRepository.save(type);
    }
    async updateType(id, data) {
        const type = await this.typeRepository.findOne({ where: { id } });
        if (!type)
            throw new common_1.NotFoundException('Type de congé non trouvé');
        const toUpdate = {
            ...data,
            defaultDays: data.default_days !== undefined ? data.default_days : data.defaultDays,
            isPaid: data.is_paid !== undefined ? data.is_paid : data.isPaid,
            requiresJustification: data.requires_justification !== undefined ? data.requires_justification : data.requiresJustification,
            isActive: data.is_active !== undefined ? data.is_active : data.isActive,
        };
        Object.assign(type, toUpdate);
        return this.typeRepository.save(type);
    }
    async deleteType(id) {
        const type = await this.typeRepository.findOne({ where: { id } });
        if (!type)
            throw new common_1.NotFoundException('Type de congé non trouvé');
        await this.typeRepository.delete(id);
    }
    async cancelRequest(id, userId) {
        const employee = await this.employeesService.findByUserId(userId);
        if (!employee)
            throw new common_1.NotFoundException('Employé non trouvé');
        const request = await this.requestRepository.findOne({
            where: { id, employeeId: employee.id }
        });
        if (!request)
            throw new common_1.NotFoundException('Demande non trouvée');
        if (request.status !== leave_request_entity_1.LeaveRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Seules les demandes en attente peuvent être annulées');
        }
        await this.dataSource.transaction(async (manager) => {
            const year = new Date(request.startDate).getFullYear();
            const balance = await manager.findOne(leave_balance_entity_1.LeaveBalance, {
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
            });
            if (balance) {
                balance.pendingDays = Math.max(0, Number(balance.pendingDays) - Number(request.daysCount));
                await manager.save(balance);
            }
            request.status = leave_request_entity_1.LeaveRequestStatus.CANCELLED;
            await manager.save(request);
            await this.auditService.log({
                action: 'cancel',
                entityType: 'leave_request',
                entityId: id,
                entityName: `Annulation demande congé par l'employé`,
                oldValues: { status: leave_request_entity_1.LeaveRequestStatus.PENDING },
                newValues: { status: leave_request_entity_1.LeaveRequestStatus.CANCELLED },
                userId: userId,
            });
        });
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_request_entity_1.LeaveRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(leave_type_entity_1.LeaveType)),
    __param(2, (0, typeorm_1.InjectRepository)(leave_balance_entity_1.LeaveBalance)),
    __param(3, (0, typeorm_1.InjectRepository)(company_settings_entity_1.CompanySettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        approvals_service_1.ApprovalsService,
        typeorm_2.DataSource,
        audit_service_1.AuditService,
        employees_service_1.EmployeesService,
        event_emitter_1.EventEmitter2])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map