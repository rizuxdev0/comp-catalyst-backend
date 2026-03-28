import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HRDocument, HRDocumentStatus } from '../employees/entities/hr-document.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class HrDocumentsService {
  constructor(
    @InjectRepository(HRDocument)
    private documentRepository: Repository<HRDocument>,
    @InjectRepository(DocumentSignature)
    private signatureRepository: Repository<DocumentSignature>,
    private auditService: AuditService,
  ) {}

  async fetchSignatures(documentId: string): Promise<DocumentSignature[]> {
    return this.signatureRepository.find({
      where: { documentId, isValid: true },
      order: { signedAt: 'DESC' },
    });
  }

  async addSignature(data: Partial<DocumentSignature>): Promise<DocumentSignature> {
    const doc = await this.findOne(data.documentId);
    if (doc.isSigned) {
      throw new ForbiddenException('Ce document est déjà signé et ne peut plus être modifié.');
    }

    const signature = this.signatureRepository.create(data);
    const saved = await this.signatureRepository.save(signature);
    
    // Also update the document status if needed
    await this.documentRepository.update(data.documentId, { 
      isSigned: true, 
      status: HRDocumentStatus.SIGNED, // Use SIGNED instead of VALID
      signedAt: new Date(),
      signedBy: data.signerName
    });

    // LOG TO AUDIT
    await this.auditService.log({
      userId: data.signerId,
      action: 'SIGN_DOCUMENT',
      entityType: 'HRDocument',
      entityId: doc.id,
      entityName: doc.title,
      newValues: { signer: data.signerName, signedAt: new Date() }
    });
    
    return saved;
  }

  async findAll(employeeId?: string): Promise<HRDocument[]> {
    const where = employeeId ? { employeeId } : {};
    return this.documentRepository.find({
      where,
      relations: ['employee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<HRDocument> {
    const doc = await this.documentRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!doc) throw new NotFoundException('Document non trouvé');
    return doc;
  }

  async create(data: Partial<HRDocument>): Promise<HRDocument> {
    const doc = this.documentRepository.create(data);
    return this.documentRepository.save(doc);
  }

  async update(id: string, data: Partial<HRDocument>): Promise<HRDocument> {
    await this.documentRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const doc = await this.findOne(id);
    await this.documentRepository.delete(id);
    
    // LOG TO AUDIT
    await this.auditService.log({
      action: 'DELETE_DOCUMENT',
      entityType: 'HRDocument',
      entityId: id,
      entityName: doc.title,
    });
  }

  async markAsSigned(id: string): Promise<HRDocument> {
    await this.documentRepository.update(id, { isSigned: true, status: HRDocumentStatus.VALID });
    return this.findOne(id);
  }
}
