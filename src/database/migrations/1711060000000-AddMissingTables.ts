import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingTables1711060000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // ==================== TRAINING CATALOG ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS training_catalog (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                category VARCHAR(50) DEFAULT 'technical',
                description TEXT,
                duration_hours INTEGER DEFAULT 0,
                cost_per_participant DECIMAL(12,2) DEFAULT 0,
                provider VARCHAR(200),
                certification_available BOOLEAN DEFAULT false,
                certification_name VARCHAR(200),
                skills_covered JSONB DEFAULT '[]',
                prerequisites TEXT,
                target_audience VARCHAR(200),
                delivery_mode VARCHAR(50) DEFAULT 'in_person',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== SKILLS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                category VARCHAR(50) DEFAULT 'technical',
                description TEXT,
                level_scale INTEGER DEFAULT 5,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== CERTIFICATIONS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS certifications (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                issuing_body VARCHAR(200),
                validity_months INTEGER,
                description TEXT,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== EMPLOYEE SKILLS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS employee_skills (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
                skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
                current_level INTEGER DEFAULT 1,
                target_level INTEGER DEFAULT 3,
                assessed_at TIMESTAMPTZ,
                notes TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== EMPLOYEE CERTIFICATIONS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS employee_certifications (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
                certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE NOT NULL,
                obtained_date DATE NOT NULL,
                expiry_date DATE,
                certificate_url TEXT,
                status VARCHAR(20) DEFAULT 'active',
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== DEVELOPMENT PLANS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS development_plans (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                start_date DATE NOT NULL,
                target_date DATE,
                status VARCHAR(20) DEFAULT 'draft',
                objectives JSONB DEFAULT '[]',
                progress_percentage INTEGER DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== TRAINING EVALUATIONS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS training_evaluations (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                training_id UUID,
                employee_id UUID REFERENCES employees(id),
                score DECIMAL(5,2),
                feedback TEXT,
                evaluated_at TIMESTAMPTZ DEFAULT now(),
                created_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== COUNTRY TAX SETTINGS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS country_tax_settings (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                country_name VARCHAR(200) NOT NULL,
                country_code VARCHAR(10) NOT NULL,
                currency_code VARCHAR(10) DEFAULT 'XOF',
                currency_symbol VARCHAR(10) DEFAULT 'FCFA',
                income_tax_brackets JSONB DEFAULT '[]',
                social_contributions JSONB DEFAULT '[]',
                employer_charges JSONB DEFAULT '[]',
                vat_rate DECIMAL(5,2) DEFAULT 18,
                fiscal_year_start_month INTEGER DEFAULT 1,
                tax_rules JSONB DEFAULT '{}',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== SALARY GRID ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS salary_grid (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                category VARCHAR(50) NOT NULL,
                echelon VARCHAR(50) NOT NULL,
                education_level VARCHAR(50),
                base_index INTEGER DEFAULT 100,
                index_value DECIMAL(12,2) DEFAULT 0,
                min_salary DECIMAL(15,2) NOT NULL,
                max_salary DECIMAL(15,2) NOT NULL,
                hourly_rate DECIMAL(10,2),
                description TEXT,
                class VARCHAR(100),
                seniority_bonus_rate DECIMAL(5,2) DEFAULT 0,
                performance_bonus_rate DECIMAL(5,2) DEFAULT 0,
                transport_allowance DECIMAL(12,2) DEFAULT 0,
                housing_allowance DECIMAL(12,2) DEFAULT 0,
                employer_charges_rate DECIMAL(5,2) DEFAULT 0,
                employee_charges_rate DECIMAL(5,2) DEFAULT 0,
                total_gross DECIMAL(15,2),
                net_salary DECIMAL(15,2),
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== EMPLOYEE SURVEYS (mapped from surveys) ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS employee_surveys (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(300) NOT NULL,
                description TEXT,
                type VARCHAR(50) DEFAULT 'survey',
                questions JSONB DEFAULT '[]',
                status VARCHAR(20) DEFAULT 'draft',
                start_date DATE,
                end_date DATE,
                is_anonymous BOOLEAN DEFAULT true,
                target_audience VARCHAR(50) DEFAULT 'all',
                target_department_id UUID,
                created_by UUID REFERENCES users(id),
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== SURVEY RESPONSES ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS survey_responses (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                survey_id UUID REFERENCES employee_surveys(id) ON DELETE CASCADE NOT NULL,
                respondent_id UUID REFERENCES employees(id),
                answers JSONB DEFAULT '[]',
                suggestion_text TEXT,
                rating INTEGER,
                submitted_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== SUGGESTION BOX ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS suggestion_box (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id),
                title VARCHAR(300) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(50) DEFAULT 'general',
                status VARCHAR(20) DEFAULT 'pending',
                is_anonymous BOOLEAN DEFAULT false,
                votes_count INTEGER DEFAULT 0,
                admin_response TEXT,
                responded_by UUID REFERENCES users(id),
                responded_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== SUGGESTION VOTES ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS suggestion_votes (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                suggestion_id UUID REFERENCES suggestion_box(id) ON DELETE CASCADE NOT NULL,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                vote_type VARCHAR(10) DEFAULT 'up',
                created_at TIMESTAMPTZ DEFAULT now(),
                UNIQUE(suggestion_id, user_id)
            );
        `);

        // ==================== STAFF DELEGATES ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS staff_delegates (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) NOT NULL,
                delegate_type VARCHAR(50) NOT NULL,
                mandate_start_date DATE NOT NULL,
                mandate_end_date DATE,
                constituency VARCHAR(200),
                status VARCHAR(20) DEFAULT 'active',
                notes TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== DELEGATE SETTINGS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS delegate_settings (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                key VARCHAR(100) UNIQUE NOT NULL,
                value TEXT,
                description TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== EMPLOYEE UPDATE REQUESTS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS employee_update_requests (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
                field_name VARCHAR(100) NOT NULL,
                old_value TEXT,
                new_value TEXT,
                reason TEXT,
                status VARCHAR(20) DEFAULT 'pending',
                approved_by UUID REFERENCES users(id),
                approved_at TIMESTAMPTZ,
                rejection_reason TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== TRASH BIN ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS trash_bin (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                entity_type VARCHAR(100) NOT NULL,
                entity_id UUID NOT NULL,
                entity_data JSONB NOT NULL,
                deleted_by UUID REFERENCES users(id),
                deleted_at TIMESTAMPTZ DEFAULT now(),
                permanently_deleted BOOLEAN DEFAULT false,
                restore_deadline TIMESTAMPTZ
            );
        `);

        // ==================== INTERVIEWS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS interviews (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                application_id UUID,
                candidate_name VARCHAR(200),
                position VARCHAR(200),
                interview_type VARCHAR(50) DEFAULT 'on_site',
                scheduled_date TIMESTAMPTZ NOT NULL,
                duration_minutes INTEGER DEFAULT 60,
                location VARCHAR(200),
                interviewers JSONB DEFAULT '[]',
                status VARCHAR(20) DEFAULT 'scheduled',
                feedback TEXT,
                rating INTEGER,
                notes TEXT,
                created_by UUID REFERENCES users(id),
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== NOTIFICATION PREFERENCES ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS notification_preferences (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "userId" UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                category VARCHAR(50) NOT NULL,
                "inApp" BOOLEAN DEFAULT true,
                email BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS notification_preferences`);
        await queryRunner.query(`DROP TABLE IF EXISTS interviews`);
        await queryRunner.query(`DROP TABLE IF EXISTS trash_bin`);
        await queryRunner.query(`DROP TABLE IF EXISTS employee_update_requests`);
        await queryRunner.query(`DROP TABLE IF EXISTS delegate_settings`);
        await queryRunner.query(`DROP TABLE IF EXISTS staff_delegates`);
        await queryRunner.query(`DROP TABLE IF EXISTS suggestion_votes`);
        await queryRunner.query(`DROP TABLE IF EXISTS suggestion_box`);
        await queryRunner.query(`DROP TABLE IF EXISTS survey_responses`);
        await queryRunner.query(`DROP TABLE IF EXISTS employee_surveys`);
        await queryRunner.query(`DROP TABLE IF EXISTS salary_grid`);
        await queryRunner.query(`DROP TABLE IF EXISTS country_tax_settings`);
        await queryRunner.query(`DROP TABLE IF EXISTS training_evaluations`);
        await queryRunner.query(`DROP TABLE IF EXISTS development_plans`);
        await queryRunner.query(`DROP TABLE IF EXISTS employee_certifications`);
        await queryRunner.query(`DROP TABLE IF EXISTS employee_skills`);
        await queryRunner.query(`DROP TABLE IF EXISTS certifications`);
        await queryRunner.query(`DROP TABLE IF EXISTS skills`);
        await queryRunner.query(`DROP TABLE IF EXISTS training_catalog`);
    }
}
