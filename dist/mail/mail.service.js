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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../settings/settings.service");
const nodemailer = require("nodemailer");
let MailService = MailService_1 = class MailService {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async createTransporter() {
        const settings = await this.settingsService.getSmtpSettingsWithPassword();
        if (!settings || !settings.isActive) {
            this.logger.warn('SMTP settings not configured or not active');
            return null;
        }
        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: settings.port,
            secure: settings.secure,
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
        });
        return { transporter, settings };
    }
    async sendMail(to, subject, template, context) {
        try {
            const result = await this.createTransporter();
            if (!result)
                return;
            const { transporter, settings } = result;
            const info = await transporter.sendMail({
                from: `"${settings.fromName}" <${settings.fromEmail}>`,
                to,
                subject,
                html: template,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
            return info;
        }
        catch (error) {
            this.logger.error('Error sending email', error);
            throw error;
        }
    }
    async testConnection(smtpData) {
        try {
            const transporter = nodemailer.createTransport({
                host: smtpData.host,
                port: smtpData.port,
                secure: smtpData.secure,
                auth: {
                    user: smtpData.user,
                    pass: smtpData.pass,
                },
            });
            await transporter.verify();
            return { success: true, message: 'Connection SMTP réussie' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], MailService);
//# sourceMappingURL=mail.service.js.map