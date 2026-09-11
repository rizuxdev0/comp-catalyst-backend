import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds ip_address and user_agent columns to the audit_logs table.
 * These columns enable network-level traceability for every audited action,
 * capturing the client's IP address and browser/device information.
 */
export class AddAuditIpTracking1711060000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add IP address column — nullable because existing rows have no IP data
    await queryRunner.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45) DEFAULT NULL
    `);

    // Add user agent column — nullable for same reason
    await queryRunner.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS user_agent TEXT DEFAULT NULL
    `);

    // Index on ip_address for efficient filtering by IP in the audit UI
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address 
      ON audit_logs (ip_address) 
      WHERE ip_address IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_audit_logs_ip_address`);
    await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS user_agent`);
    await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS ip_address`);
  }
}
