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
exports.HrDocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hr_document_entity_1 = require("../employees/entities/hr-document.entity");
const document_signature_entity_1 = require("./entities/document-signature.entity");
const audit_service_1 = require("../audit/audit.service");
let HrDocumentsService = class HrDocumentsService {
    constructor(documentRepository, signatureRepository, auditService) {
        this.documentRepository = documentRepository;
        this.signatureRepository = signatureRepository;
        this.auditService = auditService;
    }
    async fetchSignatures(documentId) {
        return this.signatureRepository.find({
            where: { documentId, isValid: true },
            order: { signedAt: 'DESC' },
        });
    }
    async addSignature(data) {
        const doc = await this.findOne(data.documentId);
        if (doc.isSigned) {
            throw new common_1.ForbiddenException('Ce document est déjà signé et ne peut plus être modifié.');
        }
        const signature = this.signatureRepository.create(data);
        const saved = await this.signatureRepository.save(signature);
        await this.documentRepository.update(data.documentId, {
            isSigned: true,
            status: hr_document_entity_1.HRDocumentStatus.SIGNED,
            signedAt: new Date(),
            signedBy: data.signerName
        });
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
    async findAll(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.documentRepository.find({
            where,
            relations: ['employee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const doc = await this.documentRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!doc)
            throw new common_1.NotFoundException('Document non trouvé');
        return doc;
    }
    async create(data) {
        const doc = this.documentRepository.create(data);
        return this.documentRepository.save(doc);
    }
    async update(id, data) {
        await this.documentRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const doc = await this.findOne(id);
        await this.documentRepository.delete(id);
        await this.auditService.log({
            action: 'DELETE_DOCUMENT',
            entityType: 'HRDocument',
            entityId: id,
            entityName: doc.title,
        });
    }
    async markAsSigned(id) {
        await this.documentRepository.update(id, { isSigned: true, status: hr_document_entity_1.HRDocumentStatus.VALID });
        return this.findOne(id);
    }
};
exports.HrDocumentsService = HrDocumentsService;
exports.HrDocumentsService = HrDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hr_document_entity_1.HRDocument)),
    __param(1, (0, typeorm_1.InjectRepository)(document_signature_entity_1.DocumentSignature)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        audit_service_1.AuditService])
], HrDocumentsService);
//# sourceMappingURL=hr-documents.service.js.map