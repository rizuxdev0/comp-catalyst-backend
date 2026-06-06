"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApplicationStatusValues1711060000001 = void 0;
class AddApplicationStatusValues1711060000001 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        console.log('Cannot remove enum values in PostgreSQL. Manual intervention required.');
    }
}
exports.AddApplicationStatusValues1711060000001 = AddApplicationStatusValues1711060000001;
//# sourceMappingURL=1711060000001-AddApplicationStatusValues.js.map