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
var NotificationsListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const notifications_service_1 = require("./notifications.service");
const mail_service_1 = require("../mail/mail.service");
let NotificationsListener = NotificationsListener_1 = class NotificationsListener {
    constructor(notificationsService, mailService) {
        this.notificationsService = notificationsService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(NotificationsListener_1.name);
    }
    async handleLeaveUpdated(payload) {
        const { userId, status, leaveType, startDate } = payload;
        let title = '';
        let message = '';
        let type = 'info';
        if (status === 'approved') {
            title = 'Congé approuvé';
            message = `Votre demande de congé (${leaveType}) débutant le ${startDate} a été approuvée.`;
            type = 'success';
        }
        else if (status === 'rejected') {
            title = 'Congé refusé';
            message = `Votre demande de congé (${leaveType}) débutant le ${startDate} a été refusée.`;
            type = 'error';
        }
        if (title) {
            await this.notificationsService.create({
                userId,
                title,
                message,
                type,
                category: 'leave',
            });
            try {
                const body = `<h2>${title}</h2><p>${message}</p>`;
                this.logger.log(`Transactional email would be sent to user ${userId}: ${title}`);
            }
            catch (err) {
                this.logger.error(`Failed to send transactional email to ${userId}`, err);
            }
        }
    }
    async handlePayrollFinalized(payload) {
        const { userId, month, year } = payload;
        await this.notificationsService.create({
            userId,
            title: 'Bulletin disponible',
            message: `Votre bulletin de paie pour ${month} ${year} est désormais disponible dans votre portail.`,
            type: 'success',
            category: 'payroll',
        });
    }
    async handleContractExpiring(payload) {
        const { userId, employeeName, daysLeft, type } = payload;
        await this.notificationsService.create({
            userId,
            title: `Alerte Contrat: ${employeeName}`,
            message: `Le contrat (${type}) de ${employeeName} expire dans ${daysLeft} jours.`,
            type: 'warning',
            category: 'contract',
        });
    }
};
exports.NotificationsListener = NotificationsListener;
__decorate([
    (0, event_emitter_1.OnEvent)('leave.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleLeaveUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('payroll.finalized'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handlePayrollFinalized", null);
__decorate([
    (0, event_emitter_1.OnEvent)('contract.expiring'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleContractExpiring", null);
exports.NotificationsListener = NotificationsListener = NotificationsListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        mail_service_1.MailService])
], NotificationsListener);
//# sourceMappingURL=notifications.listener.js.map