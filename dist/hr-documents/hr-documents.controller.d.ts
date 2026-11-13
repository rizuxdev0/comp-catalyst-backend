import { HrDocumentsService } from './hr-documents.service';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { DocumentSignature } from './entities/document-signature.entity';
export declare class HrDocumentsController {
    private readonly documentsService;
    constructor(documentsService: HrDocumentsService);
    create(createDto: Partial<HRDocument>): Promise<HRDocument>;
    findAll(employeeId?: string): Promise<HRDocument[]>;
    findOne(id: string): Promise<HRDocument>;
    update(id: string, updateData: Partial<HRDocument>): Promise<HRDocument>;
    remove(id: string): Promise<void>;
    getSignatures(id: string): Promise<DocumentSignature[]>;
    addSignature(data: Partial<DocumentSignature>): Promise<DocumentSignature>;
    sign(id: string): Promise<HRDocument>;
}
