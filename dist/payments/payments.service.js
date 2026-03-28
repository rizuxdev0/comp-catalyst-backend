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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const eventemitter2_1 = require("eventemitter2");
let PaymentsService = class PaymentsService {
    constructor(paymentsRepository, eventEmitter) {
        this.paymentsRepository = paymentsRepository;
        this.eventEmitter = eventEmitter;
    }
    async findAll() {
        return this.paymentsRepository.find({
            relations: ['employee'],
            order: { paymentDate: 'DESC' },
        });
    }
    async findOne(id) {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        return payment;
    }
    async create(data) {
        if (!data.transactionId) {
            data.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
        }
        const payment = this.paymentsRepository.create(data);
        const saved = await this.paymentsRepository.save(payment);
        this.eventEmitter.emit('audit.log', {
            action: 'PAYMENT_CREATE',
            entityType: 'payment',
            entityId: saved.id,
            entityName: saved.transactionId,
            newValues: saved,
        });
        return saved;
    }
    async updateStatus(id, status, additionalData) {
        const payment = await this.findOne(id);
        const updateData = { status, ...additionalData };
        if (status === payment_entity_1.PaymentStatus.COMPLETED) {
            updateData.processedAt = new Date();
        }
        await this.paymentsRepository.update(id, updateData);
        const updated = await this.findOne(id);
        this.eventEmitter.emit('audit.log', {
            action: 'PAYMENT_STATUS_UPDATE',
            entityType: 'payment',
            entityId: id,
            entityName: updated.transactionId,
            oldValues: { status: payment.status },
            newValues: { status: updated.status },
        });
        return updated;
    }
    async retry(id) {
        const payment = await this.findOne(id);
        return this.updateStatus(id, payment_entity_1.PaymentStatus.PENDING, {
            failureReason: null,
            retryCount: (payment.retryCount || 0) + 1,
        });
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await this.paymentsRepository.delete(id);
        this.eventEmitter.emit('audit.log', {
            action: 'PAYMENT_DELETE',
            entityType: 'payment',
            entityId: id,
            entityName: payment.transactionId,
            oldValues: payment,
        });
    }
    async createBulk(employeeIds, data) {
        const payments = employeeIds.map(empId => ({
            employeeId: empId,
            amount: data.amount,
            paymentMethod: data.payment_method,
            periodMonth: data.period_month,
            periodYear: data.period_year,
            notes: data.notes || null,
            status: payment_entity_1.PaymentStatus.PENDING,
            transactionId: `TXN-BULK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`,
        }));
        const created = await this.paymentsRepository.save(this.paymentsRepository.create(payments));
        this.eventEmitter.emit('audit.log', {
            action: 'PAYMENT_BULK_CREATE',
            entityType: 'payment',
            entityName: `Paiement en masse (${employeeIds.length})`,
            metadata: { count: employeeIds.length, ...data },
        });
        return created;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        eventemitter2_1.EventEmitter2])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map