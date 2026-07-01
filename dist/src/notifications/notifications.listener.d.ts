import { NotificationsService } from './notifications.service';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
export declare class NotificationsListener {
    private readonly notificationsService;
    private readonly mailService;
    private readonly employeeRepo;
    private readonly logger;
    constructor(notificationsService: NotificationsService, mailService: MailService, employeeRepo: Repository<Employee>);
    handleLeaveUpdated(payload: {
        userId: string;
        status: string;
        leaveType: string;
        startDate: string;
    }): Promise<void>;
    handleLeaveCreated(payload: {
        adminIds: string[];
        employeeName: string;
        leaveType: string;
        startDate: string;
    }): Promise<void>;
    handleCertificateCreated(payload: {
        adminIds: string[];
        employeeName: string;
        certType: string;
    }): Promise<void>;
    handleCertificateUpdated(payload: {
        userId: string;
        status: string;
        certType: string;
    }): Promise<void>;
    handlePayrollFinalized(payload: {
        userId: string;
        month: string;
        year: number;
    }): Promise<void>;
    handleContractExpiring(payload: {
        userId: string;
        employeeName: string;
        daysLeft: number;
        type: string;
    }): Promise<void>;
    handleCommunicationPublished(communication: any): Promise<void>;
}
