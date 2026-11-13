import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
import { Employee } from '../employees/entities/employee.entity';
export declare class CertificatesService {
    private readonly certRepo;
    private readonly employeeRepo;
    private readonly eventEmitter;
    private readonly dataSource;
    constructor(certRepo: Repository<CertificateRequest>, employeeRepo: Repository<Employee>, eventEmitter: EventEmitter2, dataSource: DataSource);
    findMyRequests(userId: string): Promise<CertificateRequest[]>;
    findAll(): Promise<CertificateRequest[]>;
    create(userId: string, data: Partial<CertificateRequest>): Promise<CertificateRequest>;
    updateStatus(id: string, status: CertificateRequestStatus, processedBy?: string, rejectionReason?: string, content?: string): Promise<CertificateRequest>;
}
