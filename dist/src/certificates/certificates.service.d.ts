import { Repository } from 'typeorm';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
import { Employee } from '../employees/entities/employee.entity';
export declare class CertificatesService {
    private readonly certRepo;
    private readonly employeeRepo;
    constructor(certRepo: Repository<CertificateRequest>, employeeRepo: Repository<Employee>);
    findMyRequests(userId: string): Promise<CertificateRequest[]>;
    findAll(): Promise<CertificateRequest[]>;
    create(userId: string, data: Partial<CertificateRequest>): Promise<CertificateRequest>;
    updateStatus(id: string, status: CertificateRequestStatus, processedBy?: string, rejectionReason?: string): Promise<CertificateRequest>;
}
