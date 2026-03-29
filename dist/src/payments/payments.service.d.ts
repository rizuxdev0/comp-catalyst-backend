import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { EventEmitter2 } from 'eventemitter2';
export declare class PaymentsService {
    private paymentsRepository;
    private eventEmitter;
    constructor(paymentsRepository: Repository<Payment>, eventEmitter: EventEmitter2);
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    create(data: Partial<Payment>): Promise<Payment>;
    updateStatus(id: string, status: PaymentStatus, additionalData?: any): Promise<Payment>;
    retry(id: string): Promise<Payment>;
    remove(id: string): Promise<void>;
    createBulk(employeeIds: string[], data: any): Promise<Payment[]>;
}
