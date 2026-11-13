import { Employee } from '../../employees/entities/employee.entity';
export declare enum HRDocumentType {
    CONTRACT = "contract",
    PAYSLIP = "payslip",
    CERTIFICATE = "certificate",
    ID_PROOF = "id_proof",
    RESUME = "resume",
    DIPLOMA = "diploma",
    OTHER = "other"
}
export declare enum HRDocumentStatus {
    DRAFT = "draft",
    SIGNED = "signed",
    EXPIRED = "expired",
    VALID = "valid"
}
export declare class HRDocument {
    id: string;
    employeeId: string;
    employee: Employee;
    title: string;
    type: HRDocumentType;
    category: string;
    documentUrl: string;
    description: string;
    fileName: string;
    fileSize: number;
    isConfidential: boolean;
    isSigned: boolean;
    signedAt: Date;
    signedBy: string;
    status: HRDocumentStatus;
    expiryDate: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
