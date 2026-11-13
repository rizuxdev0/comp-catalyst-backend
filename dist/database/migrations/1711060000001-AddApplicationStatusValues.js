"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApplicationStatusValues1711060000001 = void 0;
class AddApplicationStatusValues1711060000001 {
    async up(queryRunner) {
        const enumTypes = await queryRunner.query(`SELECT typname FROM pg_type WHERE typname IN ('job_applications_status_enum', 'application_status')`);
        const typeNames = enumTypes.map((r) => r.typname);
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
    async down(queryRunner) {
        console.log('Cannot remove enum values in PostgreSQL. Manual intervention required.');
    }
}
exports.AddApplicationStatusValues1711060000001 = AddApplicationStatusValues1711060000001;
//# sourceMappingURL=1711060000001-AddApplicationStatusValues.js.map