import { HRDocument } from '../../employees/entities/hr-document.entity';
export declare class DocumentSignature {
    id: string;
    documentId: string;
    document: HRDocument;
    signerId: string;
    signerName: string;
    signerEmail: string;
    signatureType: string;
    signatureImageUrl: string;
    ipAddress: string;
    userAgent: string;
    validationCode: string;
    isValid: boolean;
    signedAt: Date;
    revokedAt: Date;
    revokedReason: string;
    metadata: any;
    createdAt: Date;
}
