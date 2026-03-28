import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordPolicy } from './entities/password-policy.entity';
import { CompanySettings } from './entities/company-settings.entity';
import { SmtpSettings } from './entities/smtp-settings.entity';
import { ContractTypeSetting } from './entities/contract-type-setting.entity';
import { CollectiveAgreement } from './entities/collective-agreement.entity';
import { MailService } from '../mail/mail.service';
import { AuditService } from '../audit/audit.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(CompanySettings)
    private settingsRepository: Repository<CompanySettings>,
    @InjectRepository(PasswordPolicy)
    private passwordPolicyRepository: Repository<PasswordPolicy>,
    @InjectRepository(SmtpSettings)
    private smtpRepository: Repository<SmtpSettings>,
    @InjectRepository(ContractTypeSetting)
    private contractTypeRepository: Repository<ContractTypeSetting>,
    @InjectRepository(CollectiveAgreement)
    private collectiveAgreementRepository: Repository<CollectiveAgreement>,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
    private auditService: AuditService,
  ) {}

  // ======= COMPANY SETTINGS =======
  async getSettings(): Promise<CompanySettings> {
    const settings = await this.settingsRepository.find();
    if (settings.length === 0) {
      const newSettings = this.settingsRepository.create();
      return this.settingsRepository.save(newSettings);
    }
    return settings[0];
  }

  async updateSettings(updateData: Partial<CompanySettings>, user?: User): Promise<CompanySettings> {
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

  async initialize(data: any): Promise<CompanySettings> {
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

  // ======= PASSWORD POLICY =======
  async getPasswordPolicy(): Promise<PasswordPolicy> {
    const policies = await this.passwordPolicyRepository.find({ take: 1 });
    if (policies.length === 0) {
      const newPolicy = this.passwordPolicyRepository.create();
      return this.passwordPolicyRepository.save(newPolicy);
    }
    return policies[0];
  }

  async updatePasswordPolicy(id: string, data: Partial<PasswordPolicy>, user?: User): Promise<PasswordPolicy> {
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

  // ======= SMTP SETTINGS =======
  async getSmtpSettings(): Promise<SmtpSettings> {
    const settings = await this.smtpRepository.find({ 
      take: 1,
      select: ['id', 'host', 'port', 'user', 'secure', 'fromName', 'fromEmail', 'isActive', 'createdAt', 'updatedAt'] // Dont select pass
    });
    if (settings.length === 0) {
      const newSettings = this.smtpRepository.create();
      return this.smtpRepository.save(newSettings);
    }
    return settings[0];
  }

  async updateSmtpSettings(data: Partial<SmtpSettings>, user?: User): Promise<SmtpSettings> {
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
    
    // We update only the fields provided. If pass is empty, we don't update it
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

  async testSmtp(data: any): Promise<any> {
    return this.mailService.testConnection(data);
  }

  async getSmtpSettingsWithPassword(): Promise<SmtpSettings | null> {
    return this.smtpRepository.findOne({
      where: {},
      select: ['id', 'host', 'port', 'user', 'pass', 'secure', 'fromName', 'fromEmail', 'isActive']
    });
  }

  // ======= CONTRACT TYPES =======
  async listContractTypes(): Promise<ContractTypeSetting[]> {
    return this.contractTypeRepository.find({ order: { name: 'ASC' } });
  }

  async createContractType(data: Partial<ContractTypeSetting>): Promise<ContractTypeSetting> {
    const type = this.contractTypeRepository.create(data);
    return this.contractTypeRepository.save(type);
  }

  async updateContractType(id: string, data: Partial<ContractTypeSetting>, user?: User): Promise<ContractTypeSetting> {
    const type = await this.contractTypeRepository.findOneBy({ id });
    if (!type) throw new NotFoundException('Contract type not found');
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

  async deleteContractType(id: string): Promise<void> {
    const type = await this.contractTypeRepository.findOneBy({ id });
    if (!type) throw new NotFoundException('Contract type not found');
    await this.contractTypeRepository.remove(type);
  }

  // ======= COLLECTIVE AGREEMENTS =======
  async listCollectiveAgreements(): Promise<CollectiveAgreement[]> {
    return this.collectiveAgreementRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' }
    });
  }

  async findCollectiveAgreement(id: string): Promise<CollectiveAgreement | null> {
    return this.collectiveAgreementRepository.findOneBy({ id });
  }

  async saveCollectiveAgreement(data: Partial<CollectiveAgreement>, user?: User): Promise<CollectiveAgreement> {
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

  async deleteCollectiveAgreement(id: string, user?: User): Promise<void> {
    const agreement = await this.collectiveAgreementRepository.findOneBy({ id });
    if (!agreement) throw new NotFoundException('Collective agreement not found');

    await this.collectiveAgreementRepository.remove(agreement);
    
    await this.auditService.log({
       action: 'DELETE',
       entityType: 'CollectiveAgreement',
       entityId: id,
       entityName: agreement.name,
       userId: user?.id
    });
  }
}
