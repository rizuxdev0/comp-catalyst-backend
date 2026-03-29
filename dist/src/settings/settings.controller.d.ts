import { SettingsService } from './settings.service';
import { CompanySettings } from './entities/company-settings.entity';
import { ContractTypeSetting } from './entities/contract-type-setting.entity';
import { CollectiveAgreement } from './entities/collective-agreement.entity';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<CompanySettings>;
    updateSettings(updateData: Partial<CompanySettings>, req: any): Promise<CompanySettings>;
    initialize(data: any): Promise<CompanySettings>;
    getPasswordPolicy(): Promise<import("./entities/password-policy.entity").PasswordPolicy>;
    updatePasswordPolicy(id: string, data: any, req: any): Promise<import("./entities/password-policy.entity").PasswordPolicy>;
    getSmtpSettings(): Promise<import("./entities/smtp-settings.entity").SmtpSettings>;
    updateSmtpSettings(data: any, req: any): Promise<import("./entities/smtp-settings.entity").SmtpSettings>;
    testSmtp(data: any): Promise<any>;
    listContractTypes(): Promise<ContractTypeSetting[]>;
    createContractType(data: Partial<ContractTypeSetting>): Promise<ContractTypeSetting>;
    updateContractType(id: string, data: Partial<ContractTypeSetting>, req: any): Promise<ContractTypeSetting>;
    deleteContractType(id: string): Promise<void>;
    listCollectiveAgreements(): Promise<CollectiveAgreement[]>;
    saveCollectiveAgreement(data: Partial<CollectiveAgreement>, req: any): Promise<CollectiveAgreement>;
    deleteCollectiveAgreement(id: string, req: any): Promise<void>;
}
