import { Repository } from 'typeorm';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { AuditService } from '../audit/audit.service';
export declare class HrDocumentsService {
    private documentRepository;
    private signatureRepository;
    private auditService;
    constructor(documentRepository: Repository<HRDocument>, signatureRepository: Repository<DocumentSignature>, auditService: AuditService);
    fetchSignatures(documentId: string): Promise<DocumentSignature[]>;
    addSignature(data: Partial<DocumentSignature>): Promise<DocumentSignature>;
    findAll(employeeId?: string): Promise<HRDocument[]>;
    findOne(id: string): Promise<HRDocument>;
    create(data: Partial<HRDocument>): Promise<HRDocument>;
    update(id: string, data: Partial<HRDocument>): Promise<HRDocument>;
    remove(id: string): Promise<void>;
    markAsSigned(id: string): Promise<HRDocument>;
}
