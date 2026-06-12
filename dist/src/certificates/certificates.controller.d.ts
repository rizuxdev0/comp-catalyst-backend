import { CertificatesService } from './certificates.service';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    findMyRequests(req: any): Promise<CertificateRequest[]>;
    findAll(): Promise<CertificateRequest[]>;
    create(req: any, data: Partial<CertificateRequest>): Promise<CertificateRequest>;
    updateStatus(req: any, id: string, status: CertificateRequestStatus, rejectionReason?: string, content?: string): Promise<CertificateRequest>;
}
