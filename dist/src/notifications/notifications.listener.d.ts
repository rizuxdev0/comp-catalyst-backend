import { NotificationsService } from './notifications.service';
import { MailService } from '../mail/mail.service';
export declare class NotificationsListener {
    private readonly notificationsService;
    private readonly mailService;
    private readonly logger;
    constructor(notificationsService: NotificationsService, mailService: MailService);
    handleLeaveUpdated(payload: {
        userId: string;
        status: string;
        leaveType: string;
        startDate: string;
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
}
