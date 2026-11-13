import { PaymentsService } from './payments.service';
import { PaymentStatus } from './entities/payment.entity';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    findAll(): Promise<import("./entities/payment.entity").Payment[]>;
    findOne(id: string): Promise<import("./entities/payment.entity").Payment>;
    create(data: any): Promise<import("./entities/payment.entity").Payment>;
    updateStatus(id: string, status: PaymentStatus, additionalData?: any): Promise<import("./entities/payment.entity").Payment>;
    retry(id: string): Promise<import("./entities/payment.entity").Payment>;
    remove(id: string): Promise<void>;
    createBulk(employeeIds: string[], data: any): Promise<import("./entities/payment.entity").Payment[]>;
}
