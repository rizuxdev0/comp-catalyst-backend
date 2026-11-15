"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuditIpTracking1711060000003 = void 0;
class AddAuditIpTracking1711060000003 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        entity_type VARCHAR(255) NOT NULL,
        entity_id VARCHAR(255),
        entity_name VARCHAR(255),
        old_values JSONB,
        new_values JSONB,
        metadata JSONB,
        ip_address VARCHAR(45) DEFAULT NULL,
        user_agent TEXT DEFAULT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
        await queryRunner.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45) DEFAULT NULL
    `);
        await queryRunner.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS user_agent TEXT DEFAULT NULL
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address 
      ON audit_logs (ip_address) 
      WHERE ip_address IS NOT NULL
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'salary_frequency') THEN
          ALTER TABLE contracts DROP COLUMN salary_frequency CASCADE;
        END IF;
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salary_frequency') THEN
          DROP TYPE salary_frequency CASCADE;
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'work_mode') THEN
          ALTER TABLE contracts DROP COLUMN work_mode CASCADE;
        END IF;
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'work_mode') THEN
          DROP TYPE work_mode CASCADE;
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'shift_type') THEN
          ALTER TABLE contracts DROP COLUMN shift_type CASCADE;
        END IF;
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shift_type') THEN
          DROP TYPE shift_type CASCADE;
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'contract_type') THEN
          ALTER TABLE contracts DROP COLUMN contract_type CASCADE;
        END IF;
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contract_type') THEN
          DROP TYPE contract_type CASCADE;
        END IF;
      END
      $$;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_audit_logs_ip_address`);
        await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS user_agent`);
        await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS ip_address`);
    }
}
exports.AddAuditIpTracking1711060000003 = AddAuditIpTracking1711060000003;
//# sourceMappingURL=1711060000003-AddAuditIpTracking.js.map