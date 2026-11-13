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
exports.HolidayPlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const holiday_plan_entity_1 = require("./entities/holiday-plan.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const audit_service_1 = require("../audit/audit.service");
let HolidayPlanService = class HolidayPlanService {
    constructor(planRepository, employeeRepository, auditService) {
        this.planRepository = planRepository;
        this.employeeRepository = employeeRepository;
        this.auditService = auditService;
    }
    async findAll(filters = {}) {
        const where = {};
        if (filters.departmentId)
            where.departmentId = filters.departmentId;
        if (filters.employeeId)
            where.employeeId = filters.employeeId;
        if (filters.year) {
            const year = parseInt(filters.year);
            const start = new Date(year, 0, 1);
            const end = new Date(year, 11, 31, 23, 59, 59);
            where.startDate = { $lte: end };
        }
        const query = this.planRepository.createQueryBuilder('plan')
            .leftJoinAndSelect('plan.employee', 'employee')
            .leftJoinAndSelect('plan.department', 'department');
        if (filters.departmentId) {
            query.andWhere('plan.departmentId = :deptId', { deptId: filters.departmentId });
        }
        if (filters.year) {
            const year = filters.year;
            query.andWhere('(EXTRACT(YEAR FROM plan.startDate) = :year OR EXTRACT(YEAR FROM plan.endDate) = :year)', { year });
        }
        return query.orderBy('plan.startDate', 'ASC').getMany();
    }
    async create(data, user) {
        const roles = user.roles.map(r => r.role);
        const isAdmin = roles.includes('admin') || roles.includes('super-admin');
        const targetEmployee = await this.employeeRepository.findOne({
            where: { id: data.employeeId },
            relations: ['department']
        });
        if (!targetEmployee)
            throw new common_1.NotFoundException('Employee not found');
        if (!data.departmentId)
            data.departmentId = targetEmployee.department_id;
        if (!isAdmin) {
            const requesterEmployee = await this.employeeRepository.findOneBy({ userId: user.id });
            if (!requesterEmployee)
                throw new common_1.NotFoundException('Requester profile not found');
            if (requesterEmployee.id === data.employeeId) {
            }
            else {
                const targetDept = targetEmployee.department;
                if (targetDept?.managerId !== requesterEmployee.id) {
                    throw new Error('You do not have permission to request leave for this employee');
                }
            }
        }
        const plan = this.planRepository.create({
            ...data,
            status: 'pending'
        });
        const saved = await this.planRepository.save(plan);
        await this.auditService.log({
            userId: user.id,
            action: 'create',
            entityType: 'leave_request',
            entityId: saved.id,
            entityName: `${targetEmployee.first_name} ${targetEmployee.last_name}`,
            newValues: { startDate: data.startDate, endDate: data.endDate }
        });
        return saved;
    }
    async approve(id, approvedBy) {
        const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        await this.planRepository.update(id, {
            status: 'approved',
            approvedBy,
            approvedAt: new Date()
        });
        await this.auditService.log({
            userId: approvedBy,
            action: 'approve',
            entityType: 'leave_request',
            entityId: id,
            entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
        });
        return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
    }
    async reject(id, rejectionReason) {
        const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        await this.planRepository.update(id, {
            status: 'rejected',
            rejectionReason
        });
        await this.auditService.log({
            action: 'reject',
            entityType: 'leave_request',
            entityId: id,
            entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
            newValues: { reason: rejectionReason }
        });
        return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
    }
    async update(id, data) {
        const plan = await this.planRepository.findOneBy({ id });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        await this.planRepository.update(id, data);
        return this.planRepository.findOneBy({ id });
    }
    async cancel(id) {
        const plan = await this.planRepository.findOneBy({ id });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        await this.planRepository.update(id, { status: 'cancelled' });
        return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
    }
    async remove(id) {
        const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        await this.auditService.log({
            action: 'delete',
            entityType: 'leave_request',
            entityId: id,
            entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
        });
        return this.planRepository.remove(plan);
    }
    async bulkCreate(plans) {
        return this.planRepository.save(this.planRepository.create(plans));
    }
};
exports.HolidayPlanService = HolidayPlanService;
exports.HolidayPlanService = HolidayPlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(holiday_plan_entity_1.HolidayPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        audit_service_1.AuditService])
], HolidayPlanService);
//# sourceMappingURL=holiday-plan.service.js.map