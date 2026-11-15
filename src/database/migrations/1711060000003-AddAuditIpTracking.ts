import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the audit_logs table exists, adds ip_address and user_agent columns,
 * and cleans up obsolete enum columns on contracts that conflict with TypeORM schema synchronization.
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

    // Drop legacy enum columns on contracts with CASCADE to prevent TypeORM synchronize from failing
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_audit_logs_ip_address`);
    await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS user_agent`);
    await queryRunner.query(`ALTER TABLE audit_logs DROP COLUMN IF EXISTS ip_address`);
  }
}
