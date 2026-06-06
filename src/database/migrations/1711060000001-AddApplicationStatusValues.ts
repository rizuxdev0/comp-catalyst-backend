import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicationStatusValues1711060000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL allows ALTER TYPE ... ADD VALUE for enums
    // We use IF NOT EXISTS to be safe (PostgreSQL 9.3+)
    await queryRunner.query(`
      DO $$
      BEGIN
        -- Add 'screening' if it doesn't exist
        IF NOT EXISTS (
          SELECT 1 FROM pg_enum 
          WHERE enumlabel = 'screening' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'job_applications_status_enum')
        ) THEN
          ALTER TYPE "job_applications_status_enum" ADD VALUE 'screening' AFTER 'pending';
        END IF;

        -- Add 'testing' if it doesn't exist
        IF NOT EXISTS (
          SELECT 1 FROM pg_enum 
          WHERE enumlabel = 'testing' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'job_applications_status_enum')
        ) THEN
          ALTER TYPE "job_applications_status_enum" ADD VALUE 'testing' AFTER 'interview';
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL does not support removing values from an enum.
    // To revert, you'd need to recreate the type. Skipping for safety.
    console.log('Cannot remove enum values in PostgreSQL. Manual intervention required.');
  }
}
