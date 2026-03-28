import { SettingsService } from '../settings/settings.service';
import * as nodemailer from 'nodemailer';
export declare class MailService {
    private readonly settingsService;
    private readonly logger;
    constructor(settingsService: SettingsService);
    createTransporter(): Promise<{
        transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
        settings: import("../settings/entities/smtp-settings.entity").SmtpSettings;
    }>;
    sendMail(to: string, subject: string, template: string, context: any): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    testConnection(smtpData: any): Promise<{
        success: boolean;
        message: any;
    }>;
}
