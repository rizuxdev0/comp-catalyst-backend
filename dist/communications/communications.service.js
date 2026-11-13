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
exports.CommunicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const communication_entity_1 = require("./entities/communication.entity");
const communication_delivery_entity_1 = require("./entities/communication-delivery.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const employee_entity_1 = require("../employees/entities/employee.entity");
let CommunicationsService = class CommunicationsService {
    constructor(repo, deliveryRepo, employeeRepo, eventEmitter) {
        this.repo = repo;
        this.deliveryRepo = deliveryRepo;
        this.employeeRepo = employeeRepo;
        this.eventEmitter = eventEmitter;
    }
    findAll() {
        return this.repo.find({
            order: { created_at: 'DESC' },
            relations: ['recipient_employee', 'recipient_department'],
        });
    }
    async findOne(id) {
        const item = await this.repo.findOne({
            where: { id },
            relations: ['recipient_employee', 'recipient_department'],
        });
        if (!item)
            throw new common_1.NotFoundException('Communication non trouvée');
        return item;
    }
    async create(data) {
        const item = this.repo.create(data);
        const saved = await this.repo.save(item);
        if (saved.status === 'published') {
            const fullDoc = await this.findOne(saved.id);
            this.eventEmitter.emit('communication.published', fullDoc);
        }
        return saved;
    }
    async update(id, data) {
        const oldItem = await this.findOne(id);
        await this.repo.update(id, data);
        const updatedItem = await this.findOne(id);
        if (oldItem.status !== 'published' && updatedItem.status === 'published') {
            this.eventEmitter.emit('communication.published', updatedItem);
        }
        return updatedItem;
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async publish(id) {
        await this.repo.update(id, {
            status: 'published',
            published_at: new Date(),
        });
        const communication = await this.findOne(id);
        this.eventEmitter.emit('communication.published', communication);
        return communication;
    }
    findByStatus(status) {
        return this.repo.find({ where: { status }, order: { created_at: 'DESC' } });
    }
    async findForUser(userId) {
        const employee = await this.employeeRepo.findOne({ where: { userId } });
        if (!employee)
            return [];
        const builder = this.repo.createQueryBuilder('c');
        builder.where('c.status = :status', { status: 'published' });
        builder.andWhere(`(
      c.recipient_type = 'all' OR
      (c.recipient_type = 'department' AND c.recipient_department_id = :deptId) OR
      ((c.recipient_type = 'individual' OR c.recipient_type = 'employee') AND c.recipient_employee_id = :empId)
    )`, { deptId: employee.department_id, empId: employee.id });
        builder.orderBy('c.published_at', 'DESC');
        return builder.getMany();
    }
    async getDeliveries(communicationId) {
        return this.deliveryRepo.find({
            where: { communication_id: communicationId },
            order: { created_at: 'DESC' }
        });
    }
    async createDeliveries(communicationId, payload) {
        const { recipientType, recipientDepartmentId, recipientEmployeeId } = payload;
        let employees = [];
        if (recipientType === 'all') {
            employees = await this.employeeRepo.find({ where: { employee_status: 'active' } });
        }
        else if (recipientType === 'department' && recipientDepartmentId) {
            employees = await this.employeeRepo.find({ where: { department_id: recipientDepartmentId, employee_status: 'active' } });
        }
        else if ((recipientType === 'individual' || recipientType === 'employee') && recipientEmployeeId) {
            const emp = await this.employeeRepo.findOne({ where: { id: recipientEmployeeId } });
            if (emp)
                employees = [emp];
        }
        else {
            employees = await this.employeeRepo.find({ where: { employee_status: 'active' } });
        }
        const deliveries = [];
        for (const emp of employees) {
            if (!emp.work_email && !emp.personal_email)
                continue;
            const delivery = this.deliveryRepo.create({
                communication_id: communicationId,
                employee_id: emp.id,
                email_address: emp.work_email || emp.personal_email,
                email_type: emp.work_email ? 'work' : 'personal',
                status: 'pending',
            });
            deliveries.push(delivery);
        }
        if (deliveries.length > 0) {
            await this.deliveryRepo.save(deliveries);
        }
        return deliveries;
    }
};
exports.CommunicationsService = CommunicationsService;
exports.CommunicationsService = CommunicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(communication_entity_1.Communication)),
    __param(1, (0, typeorm_1.InjectRepository)(communication_delivery_entity_1.CommunicationDelivery)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], CommunicationsService);
//# sourceMappingURL=communications.service.js.map