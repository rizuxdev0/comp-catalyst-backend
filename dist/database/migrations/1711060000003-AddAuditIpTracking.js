"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuditIpTracking1711060000003 = void 0;
class AddAuditIpTracking1711060000003 {
    async up(queryRunner) {
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
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_audit_logs_ip_address`);
        await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS user_agent`);
        await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS ip_address`);
    }
}
exports.AddAuditIpTracking1711060000003 = AddAuditIpTracking1711060000003;
//# sourceMappingURL=1711060000003-AddAuditIpTracking.js.map