import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySettings } from './entities/company-settings.entity';
import { CountryTaxSetting, SalaryGridItem } from './entities/tax-salary.entity';
import { PasswordPolicy } from './entities/password-policy.entity';
import { SmtpSettings } from './entities/smtp-settings.entity';
import { ContractTypeSetting } from './entities/contract-type-setting.entity';
import { CollectiveAgreement } from './entities/collective-agreement.entity';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TaxSalaryService } from './tax-salary.service';
import { TaxSalaryController } from './tax-salary.controller';
import { MailModule } from '../mail/mail.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanySettings,
      CountryTaxSetting,
      SalaryGridItem,
      PasswordPolicy,
      SmtpSettings,
      ContractTypeSetting,
      CollectiveAgreement,
    ]),
    forwardRef(() => MailModule),
    AuditModule,
  ],
  controllers: [SettingsController, TaxSalaryController],
  providers: [SettingsService, TaxSalaryService],
  exports: [SettingsService, TaxSalaryService],
})
export class SettingsModule {}
