"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_settings_entity_1 = require("./entities/company-settings.entity");
const tax_salary_entity_1 = require("./entities/tax-salary.entity");
const password_policy_entity_1 = require("./entities/password-policy.entity");
const smtp_settings_entity_1 = require("./entities/smtp-settings.entity");
const contract_type_setting_entity_1 = require("./entities/contract-type-setting.entity");
const collective_agreement_entity_1 = require("./entities/collective-agreement.entity");
const settings_service_1 = require("./settings.service");
const settings_controller_1 = require("./settings.controller");
const tax_salary_service_1 = require("./tax-salary.service");
const tax_salary_controller_1 = require("./tax-salary.controller");
const mail_module_1 = require("../mail/mail.module");
const audit_module_1 = require("../audit/audit.module");
let SettingsModule = class SettingsModule {
};
exports.SettingsModule = SettingsModule;
exports.SettingsModule = SettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                company_settings_entity_1.CompanySettings,
                tax_salary_entity_1.CountryTaxSetting,
                tax_salary_entity_1.SalaryGridItem,
                password_policy_entity_1.PasswordPolicy,
                smtp_settings_entity_1.SmtpSettings,
                contract_type_setting_entity_1.ContractTypeSetting,
                collective_agreement_entity_1.CollectiveAgreement,
            ]),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            audit_module_1.AuditModule,
        ],
        controllers: [settings_controller_1.SettingsController, tax_salary_controller_1.TaxSalaryController],
        providers: [settings_service_1.SettingsService, tax_salary_service_1.TaxSalaryService],
        exports: [settings_service_1.SettingsService, tax_salary_service_1.TaxSalaryService],
    })
], SettingsModule);
//# sourceMappingURL=settings.module.js.map