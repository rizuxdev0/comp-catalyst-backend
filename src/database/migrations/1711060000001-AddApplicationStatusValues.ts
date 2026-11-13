import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicationStatusValues1711060000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check which enum type exists in PostgreSQL (application_status from InitialMigration or job_applications_status_enum)
    const enumTypes = await queryRunner.query(
      `SELECT typname FROM pg_type WHERE typname IN ('job_applications_status_enum', 'application_status')`
    );

    const typeNames: string[] = enumTypes.map((r: { typname: string }) => r.typname);

    for (const typeName of typeNames) {
      await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_enum 
            WHERE enumlabel = 'screening' 
            AND enumtypid = (SELECT oid FROM pg_type WHERE typname = '${typeName}')
          ) THEN
            ALTER TYPE "${typeName}" ADD VALUE 'screening' AFTER 'pending';
          END IF;

          IF NOT EXISTS (
            SELECT 1 FROM pg_enum 
            WHERE enumlabel = 'testing' 
            AND enumtypid = (SELECT oid FROM pg_type WHERE typname = '${typeName}')
          ) THEN
            ALTER TYPE "${typeName}" ADD VALUE 'testing' AFTER 'interview';
          END IF;
        END
        $$;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL does not support removing values from an enum.
    console.log('Cannot remove enum values in PostgreSQL. Manual intervention required.');
  }
}
