"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCompanySettingsContractDefaults1711060000002 = void 0;
class AddCompanySettingsContractDefaults1711060000002 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE company_settings
            ADD COLUMN IF NOT EXISTS default_working_days_per_week DECIMAL(5,2) DEFAULT 5,
            ADD COLUMN IF NOT EXISTS default_trial_period_days INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS default_notice_period_days INTEGER DEFAULT 30,
            ADD COLUMN IF NOT EXISTS collective_agreement VARCHAR(255),
            ADD COLUMN IF NOT EXISTS classification VARCHAR(255),
            ADD COLUMN IF NOT EXISTS coefficient VARCHAR(255);
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE company_settings
            DROP COLUMN IF EXISTS default_working_days_per_week,
            DROP COLUMN IF EXISTS default_trial_period_days,
            DROP COLUMN IF EXISTS default_notice_period_days,
            DROP COLUMN IF EXISTS collective_agreement,
            DROP COLUMN IF EXISTS classification,
            DROP COLUMN IF EXISTS coefficient;
        `);
    }
}
exports.AddCompanySettingsContractDefaults1711060000002 = AddCompanySettingsContractDefaults1711060000002;
//# sourceMappingURL=1711060000002-AddCompanySettingsContractDefaults.js.map