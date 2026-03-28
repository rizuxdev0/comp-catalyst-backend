import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ['employee'],
      order: { paymentDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async create(data: Partial<Payment>): Promise<Payment> {
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

  async updateStatus(id: string, status: PaymentStatus, additionalData?: any): Promise<Payment> {
    const payment = await this.findOne(id);
    const updateData: any = { status, ...additionalData };
    if (status === PaymentStatus.COMPLETED) {
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

  async retry(id: string): Promise<Payment> {
    const payment = await this.findOne(id);
    return this.updateStatus(id, PaymentStatus.PENDING, {
      failureReason: null,
      retryCount: (payment.retryCount || 0) + 1,
    });
  }

  async remove(id: string): Promise<void> {
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

  async createBulk(employeeIds: string[], data: any): Promise<Payment[]> {
    const payments = employeeIds.map(empId => ({
      employeeId: empId,
      amount: data.amount,
      paymentMethod: data.payment_method,
      periodMonth: data.period_month,
      periodYear: data.period_year,
      notes: data.notes || null,
      status: PaymentStatus.PENDING,
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
}
