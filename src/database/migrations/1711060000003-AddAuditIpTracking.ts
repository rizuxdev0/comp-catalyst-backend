import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the audit_logs table exists and adds ip_address and user_agent columns.
 * These columns enable network-level traceability for every audited action.
 */
export class AddAuditIpTracking1711060000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ensure audit_logs table exists
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

    // Add IP address column if table already existed without it
    await queryRunner.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45) DEFAULT NULL
    `);

    // Add user agent column
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
