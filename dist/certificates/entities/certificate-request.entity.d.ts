import { Employee } from '../../employees/entities/employee.entity';
export declare enum CertificateRequestStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    READY = "ready",
    DELIVERED = "delivered",
    REJECTED = "rejected"
}
export declare class CertificateRequest {
    id: string;
    employeeId: string;
    employee: Employee;
    type: string;
    reason: string;
    status: CertificateRequestStatus;
    processedBy: string;
    rejectionReason: string;
    content: string;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
