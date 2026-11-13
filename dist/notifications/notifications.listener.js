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
var NotificationsListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const notifications_service_1 = require("./notifications.service");
const mail_service_1 = require("../mail/mail.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
let NotificationsListener = NotificationsListener_1 = class NotificationsListener {
    constructor(notificationsService, mailService, employeeRepo) {
        this.notificationsService = notificationsService;
        this.mailService = mailService;
        this.employeeRepo = employeeRepo;
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
    async handleLeaveCreated(payload) {
        const { adminIds, employeeName, leaveType, startDate } = payload;
        const title = 'Nouvelle demande de congé';
        const message = `${employeeName} a effectué une nouvelle demande de congé (${leaveType}) débutant le ${new Date(startDate).toLocaleDateString()}.`;
        for (const adminId of adminIds) {
            await this.notificationsService.create({
                userId: adminId,
                title,
                message,
                type: 'info',
                category: 'leave',
            });
        }
    }
    async handleCertificateCreated(payload) {
        const { adminIds, employeeName, certType } = payload;
        const typeMap = {
            'WORK_CERTIFICATE': 'Attestation de travail',
            'SALARY_CERTIFICATE': 'Attestation de salaire',
            'EMPLOYMENT_LETTER': 'Lettre d\'emploi',
            'EXPERIENCE_CERTIFICATE': 'Certificat d\'expérience',
            'BANK_DOMICILIATION': 'Attestation de domiciliation bancaire'
        };
        const friendlyType = typeMap[certType] || certType;
        const title = 'Nouvelle demande de document';
        const message = `${employeeName} a effectué une nouvelle demande pour : ${friendlyType}.`;
        for (const adminId of adminIds) {
            await this.notificationsService.create({
                userId: adminId,
                title,
                message,
                type: 'info',
                category: 'document',
            });
        }
    }
    async handleCertificateUpdated(payload) {
        const { userId, status, certType } = payload;
        const typeMap = {
            'WORK_CERTIFICATE': 'Attestation de travail',
            'SALARY_CERTIFICATE': 'Attestation de salaire',
            'EMPLOYMENT_LETTER': 'Lettre d\'emploi',
            'EXPERIENCE_CERTIFICATE': 'Certificat d\'expérience',
            'BANK_DOMICILIATION': 'Attestation de domiciliation bancaire'
        };
        const friendlyType = typeMap[certType] || certType;
        let title = '';
        let message = '';
        let type = 'info';
        if (status === 'ready') {
            title = 'Document disponible';
            message = `Votre demande pour le document "${friendlyType}" est prête. Vous pouvez la télécharger.`;
            type = 'success';
        }
        else if (status === 'rejected') {
            title = 'Demande de document refusée';
            message = `Votre demande pour le document "${friendlyType}" a été refusée.`;
            type = 'error';
        }
        else if (status === 'processing') {
            title = 'Demande de document en cours';
            message = `Votre demande pour le document "${friendlyType}" est actuellement en cours de traitement.`;
            type = 'info';
        }
        if (title) {
            await this.notificationsService.create({
                userId,
                title,
                message,
                type,
                category: 'document',
            });
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
    async handleCommunicationPublished(communication) {
        let targetEmployeeUserIds = [];
        if (communication.recipient_type === 'all') {
            const employees = await this.employeeRepo.find({ where: { employee_status: 'active' } });
            targetEmployeeUserIds = employees.map(e => e.userId).filter(id => !!id);
        }
        else if (communication.recipient_type === 'department' && communication.recipient_department_id) {
            const employees = await this.employeeRepo.find({
                where: { department_id: communication.recipient_department_id, employee_status: 'active' }
            });
            targetEmployeeUserIds = employees.map(e => e.userId).filter(id => !!id);
        }
        else if (communication.recipient_type === 'individual' && communication.recipient_employee_id) {
            const employee = await this.employeeRepo.findOne({ where: { id: communication.recipient_employee_id } });
            if (employee?.userId) {
                targetEmployeeUserIds.push(employee.userId);
            }
        }
        else if (communication.recipient_type === 'employee' && communication.recipient_employee_id) {
            const employee = await this.employeeRepo.findOne({ where: { id: communication.recipient_employee_id } });
            if (employee?.userId) {
                targetEmployeeUserIds.push(employee.userId);
            }
        }
        targetEmployeeUserIds = [...new Set(targetEmployeeUserIds)];
        for (const userId of targetEmployeeUserIds) {
            await this.notificationsService.create({
                userId,
                title: `Nouveau document : ${communication.title}`,
                message: `Un nouveau document a été publié : ${communication.title}. Veuillez le consulter dans votre espace.`,
                type: 'info',
                category: 'document',
            });
        }
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
    (0, event_emitter_1.OnEvent)('leave.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleLeaveCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('certificate.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleCertificateCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('certificate.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleCertificateUpdated", null);
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
__decorate([
    (0, event_emitter_1.OnEvent)('communication.published'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsListener.prototype, "handleCommunicationPublished", null);
exports.NotificationsListener = NotificationsListener = NotificationsListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        mail_service_1.MailService,
        typeorm_2.Repository])
], NotificationsListener);
//# sourceMappingURL=notifications.listener.js.map