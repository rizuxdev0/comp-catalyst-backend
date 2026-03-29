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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const password_policy_entity_1 = require("./entities/password-policy.entity");
const company_settings_entity_1 = require("./entities/company-settings.entity");
const smtp_settings_entity_1 = require("./entities/smtp-settings.entity");
const contract_type_setting_entity_1 = require("./entities/contract-type-setting.entity");
const collective_agreement_entity_1 = require("./entities/collective-agreement.entity");
const mail_service_1 = require("../mail/mail.service");
const audit_service_1 = require("../audit/audit.service");
let SettingsService = class SettingsService {
    constructor(settingsRepository, passwordPolicyRepository, smtpRepository, contractTypeRepository, collectiveAgreementRepository, mailService, auditService) {
        this.settingsRepository = settingsRepository;
        this.passwordPolicyRepository = passwordPolicyRepository;
        this.smtpRepository = smtpRepository;
        this.contractTypeRepository = contractTypeRepository;
        this.collectiveAgreementRepository = collectiveAgreementRepository;
        this.mailService = mailService;
        this.auditService = auditService;
    }
    async getSettings() {
        const settings = await this.settingsRepository.find();
        if (settings.length === 0) {
            const newSettings = this.settingsRepository.create();
            return this.settingsRepository.save(newSettings);
        }
        return settings[0];
    }
    async updateSettings(updateData, user) {
        const settings = await this.getSettings();
        const oldValues = { ...settings };
        await this.settingsRepository.update(settings.id, updateData);
        const updated = await this.getSettings();
        await this.auditService.log({
            action: 'UPDATE',
            entityType: 'CompanySettings',
            entityId: updated.id,
            entityName: updated.company_name,
            oldValues,
            newValues: updateData,
            userId: user?.id
        });
        return updated;
    }
    async initialize(data) {
        const settings = await this.getSettings();
        await this.settingsRepository.update(settings.id, {
            ...data,
            is_initialized: true,
        });
        const updated = await this.getSettings();
        await this.auditService.log({
            action: 'INITIALIZE',
            entityType: 'CompanySettings',
            entityId: updated.id,
            entityName: updated.company_name,
            newValues: { ...data, is_initialized: true }
        });
        return updated;
    }
    async getPasswordPolicy() {
        const policies = await this.passwordPolicyRepository.find({ take: 1 });
        if (policies.length === 0) {
            const newPolicy = this.passwordPolicyRepository.create();
            return this.passwordPolicyRepository.save(newPolicy);
        }
        return policies[0];
    }
    async updatePasswordPolicy(id, data, user) {
        const policy = await this.getPasswordPolicy();
        const oldValues = { ...policy };
        await this.passwordPolicyRepository.update(id, data);
        const updated = await this.getPasswordPolicy();
        await this.auditService.log({
            action: 'UPDATE',
            entityType: 'PasswordPolicy',
            entityId: updated.id,
            entityName: 'Security Policy',
            oldValues,
            newValues: data,
            userId: user?.id
        });
        return updated;
    }
    async getSmtpSettings() {
        const settings = await this.smtpRepository.find({
            take: 1,
            select: ['id', 'host', 'port', 'user', 'secure', 'fromName', 'fromEmail', 'isActive', 'createdAt', 'updatedAt']
        });
        if (settings.length === 0) {
            const newSettings = this.smtpRepository.create();
            return this.smtpRepository.save(newSettings);
        }
        return settings[0];
    }
    async updateSmtpSettings(data, user) {
        let settings = await this.smtpRepository.findOne({ where: {} });
        const oldValues = settings ? { ...settings } : null;
        if (!settings) {
            settings = this.smtpRepository.create(data);
            const saved = await this.smtpRepository.save(settings);
            await this.auditService.log({
                action: 'CREATE',
                entityType: 'SmtpSettings',
                entityId: saved.id,
                entityName: 'SMTP Configuration',
                newValues: data,
                userId: user?.id
            });
            return saved;
        }
        const updateData = { ...data };
        if (!updateData.pass) {
            delete updateData.pass;
        }
        await this.smtpRepository.update(settings.id, updateData);
        const updated = await this.getSmtpSettings();
        await this.auditService.log({
            action: 'UPDATE',
            entityType: 'SmtpSettings',
            entityId: updated.id,
            entityName: 'SMTP Configuration',
            oldValues,
            newValues: updateData,
            userId: user?.id
        });
        return updated;
    }
    async testSmtp(data) {
        return this.mailService.testConnection(data);
    }
    async getSmtpSettingsWithPassword() {
        return this.smtpRepository.findOne({
            where: {},
            select: ['id', 'host', 'port', 'user', 'pass', 'secure', 'fromName', 'fromEmail', 'isActive']
        });
    }
    async listContractTypes() {
        return this.contractTypeRepository.find({ order: { name: 'ASC' } });
    }
    async createContractType(data) {
        const type = this.contractTypeRepository.create(data);
        return this.contractTypeRepository.save(type);
    }
    async updateContractType(id, data, user) {
        const type = await this.contractTypeRepository.findOneBy({ id });
        if (!type)
            throw new common_1.NotFoundException('Contract type not found');
        const oldValues = { ...type };
        await this.contractTypeRepository.update(id, data);
        const updated = await this.contractTypeRepository.findOneBy({ id });
        await this.auditService.log({
            action: 'UPDATE',
            entityType: 'ContractTypeSetting',
            entityId: updated.id,
            entityName: updated.name,
            oldValues,
            newValues: data,
            userId: user?.id
        });
        return updated;
    }
    async deleteContractType(id) {
        const type = await this.contractTypeRepository.findOneBy({ id });
        if (!type)
            throw new common_1.NotFoundException('Contract type not found');
        await this.contractTypeRepository.remove(type);
    }
    async listCollectiveAgreements() {
        return this.collectiveAgreementRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' }
        });
    }
    async findCollectiveAgreement(id) {
        return this.collectiveAgreementRepository.findOneBy({ id });
    }
    async saveCollectiveAgreement(data, user) {
        if (data.id) {
            const existing = await this.findCollectiveAgreement(data.id);
            const oldValues = { ...existing };
            await this.collectiveAgreementRepository.update(data.id, data);
            const updated = await this.collectiveAgreementRepository.findOneBy({ id: data.id });
            await this.auditService.log({
                action: 'UPDATE',
                entityType: 'CollectiveAgreement',
                entityId: updated.id,
                entityName: updated.name,
                oldValues,
                newValues: data,
                userId: user?.id
            });
            return updated;
        }
        const created = this.collectiveAgreementRepository.create(data);
        const saved = await this.collectiveAgreementRepository.save(created);
        await this.auditService.log({
            action: 'CREATE',
            entityType: 'CollectiveAgreement',
            entityId: saved.id,
            entityName: saved.name,
            newValues: data,
            userId: user?.id
        });
        return saved;
    }
    async deleteCollectiveAgreement(id, user) {
        const agreement = await this.collectiveAgreementRepository.findOneBy({ id });
        if (!agreement)
            throw new common_1.NotFoundException('Collective agreement not found');
        await this.collectiveAgreementRepository.remove(agreement);
        await this.auditService.log({
            action: 'DELETE',
            entityType: 'CollectiveAgreement',
            entityId: id,
            entityName: agreement.name,
            userId: user?.id
        });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_settings_entity_1.CompanySettings)),
    __param(1, (0, typeorm_1.InjectRepository)(password_policy_entity_1.PasswordPolicy)),
    __param(2, (0, typeorm_1.InjectRepository)(smtp_settings_entity_1.SmtpSettings)),
    __param(3, (0, typeorm_1.InjectRepository)(contract_type_setting_entity_1.ContractTypeSetting)),
    __param(4, (0, typeorm_1.InjectRepository)(collective_agreement_entity_1.CollectiveAgreement)),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => mail_service_1.MailService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        audit_service_1.AuditService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map