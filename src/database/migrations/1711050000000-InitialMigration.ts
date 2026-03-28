import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1711050000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enums
        await queryRunner.query(`CREATE TYPE app_role AS ENUM ('admin', 'manager', 'employee');`);
        await queryRunner.query(`CREATE TYPE password_status AS ENUM ('active', 'must_change', 'temporary', 'expired');`);
        await queryRunner.query(`CREATE TYPE employee_status AS ENUM ('active', 'on_leave', 'suspended', 'terminated', 'retired');`);
        await queryRunner.query(`CREATE TYPE employment_type AS ENUM ('permanent', 'fixed_term', 'intern', 'consultant', 'temporary');`);
        await queryRunner.query(`CREATE TYPE contract_type AS ENUM ('cdi', 'cdd', 'interim', 'apprenticeship', 'professional_contract', 'internship');`);
        await queryRunner.query(`CREATE TYPE contract_status AS ENUM ('draft', 'active', 'expired', 'terminated', 'renewed');`);
        await queryRunner.query(`CREATE TYPE salary_frequency AS ENUM ('monthly', 'biweekly', 'weekly', 'annual');`);
        await queryRunner.query(`CREATE TYPE work_mode AS ENUM ('on_site', 'remote', 'hybrid');`);
        await queryRunner.query(`CREATE TYPE shift_type AS ENUM ('day', 'night', 'rotating', 'flexible');`);
        await queryRunner.query(`CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');`);
        await queryRunner.query(`CREATE TYPE civility_type AS ENUM ('mr', 'mrs', 'ms', 'dr', 'prof');`);
        await queryRunner.query(`CREATE TYPE marital_status AS ENUM ('single', 'married', 'divorced', 'widowed', 'separated', 'pacs');`);
        await queryRunner.query(`CREATE TYPE marriage_regime AS ENUM ('community', 'separation', 'participation', 'universal_community');`);
        await queryRunner.query(`CREATE TYPE application_status AS ENUM ('pending', 'interview', 'offer', 'hired', 'rejected');`);
        await queryRunner.query(`CREATE TYPE recruitment_status AS ENUM ('open', 'in_progress', 'closed', 'cancelled');`);
        await queryRunner.query(`CREATE TYPE training_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');`);
        await queryRunner.query(`CREATE TYPE evaluation_status AS ENUM ('pending', 'in_progress', 'completed');`);
        await queryRunner.query(`CREATE TYPE expense_status AS ENUM ('pending', 'approved', 'rejected', 'reimbursed');`);

        // Users
        await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                is_active BOOLEAN DEFAULT true,
                email_verified BOOLEAN DEFAULT false,
                must_change_password BOOLEAN DEFAULT false,
                password_status password_status DEFAULT 'active',
                temporary_password_expires_at TIMESTAMPTZ,
                last_login_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE user_roles (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                role app_role NOT NULL DEFAULT 'employee',
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now(),
                UNIQUE(user_id, role)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE permissions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                module VARCHAR(100) NOT NULL,
                description TEXT,
                created_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE role_permissions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                role app_role NOT NULL,
                permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now(),
                UNIQUE(role, permission_id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE user_permissions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE NOT NULL,
                granted_by UUID REFERENCES users(id),
                expires_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ DEFAULT now(),
                UNIQUE(user_id, permission_id)
            );
        `);

        // Company settings
        await queryRunner.query(`
            CREATE TABLE company_settings (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                company_name VARCHAR(255) NOT NULL DEFAULT 'Mon Entreprise',
                legal_form VARCHAR(50),
                registration_number VARCHAR(100),
                tax_id VARCHAR(100),
                address_line1 TEXT,
                address_line2 TEXT,
                city VARCHAR(100),
                state_province VARCHAR(100),
                postal_code VARCHAR(20),
                country VARCHAR(10) DEFAULT 'TG',
                phone VARCHAR(50),
                email VARCHAR(255),
                website VARCHAR(255),
                logo_url TEXT,
                currency_code VARCHAR(10) DEFAULT 'XOF',
                currency_symbol VARCHAR(10) DEFAULT 'FCFA',
                date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY',
                time_format VARCHAR(10) DEFAULT '24h',
                timezone VARCHAR(50) DEFAULT 'Africa/Lome',
                language VARCHAR(10) DEFAULT 'fr',
                work_days_per_month INTEGER DEFAULT 22,
                work_hours_per_week DECIMAL(5,2) DEFAULT 40,
                overtime_rate DECIMAL(5,2) DEFAULT 1.5,
                employee_contribution_rate DECIMAL(5,2) DEFAULT 4.0,
                employer_contribution_rate DECIMAL(5,2) DEFAULT 17.5,
                csg_crds_rate DECIMAL(5,2) DEFAULT 0,
                annual_leave_days INTEGER DEFAULT 30,
                sick_leave_days INTEGER DEFAULT 15,
                default_monthly_leave_accrual DECIMAL(5,2) DEFAULT 2.5,
                fiscal_year_start_month INTEGER DEFAULT 1,
                bank_id UUID,
                bank_iban VARCHAR(50),
                bank_bic VARCHAR(20),
                bank_account_number VARCHAR(50),
                default_payment_method VARCHAR(50),
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // Departments
        await queryRunner.query(`
            CREATE TABLE departments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                manager_id UUID,
                parent_department_id UUID REFERENCES departments(id),
                budget DECIMAL(15,2),
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // Banks
        await queryRunner.query(`
            CREATE TABLE banks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                swift_code VARCHAR(20),
                address TEXT,
                city VARCHAR(100),
                country VARCHAR(100),
                phone VARCHAR(50),
                email VARCHAR(255),
                website VARCHAR(255),
                is_active BOOLEAN DEFAULT true,
                is_company_bank BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // Employees
        await queryRunner.query(`
            CREATE TABLE employees (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id),
                employee_code VARCHAR(20) UNIQUE NOT NULL,
                employee_number VARCHAR(50),
                civility civility_type,
                first_name VARCHAR(100) NOT NULL,
                middle_name VARCHAR(100),
                last_name VARCHAR(100) NOT NULL,
                preferred_name VARCHAR(100),
                gender gender_type,
                date_of_birth DATE,
                place_of_birth VARCHAR(200),
                nationality VARCHAR(100),
                marital_status marital_status,
                marriage_regime marriage_regime,
                spouse_name VARCHAR(200),
                number_of_dependents INTEGER DEFAULT 0,
                national_id_number VARCHAR(100),
                social_security_number VARCHAR(100),
                passport_number VARCHAR(100),
                passport_expiration_date DATE,
                tax_number VARCHAR(100),
                work_permit_number VARCHAR(100),
                work_permit_expiration_date DATE,
                work_email VARCHAR(255),
                personal_email VARCHAR(255),
                work_phone VARCHAR(50),
                personal_phone VARCHAR(50),
                address_line1 TEXT,
                address_line2 TEXT,
                city VARCHAR(100),
                state_or_province VARCHAR(100),
                postal_code VARCHAR(20),
                country_code VARCHAR(10),
                emergency_contact_name VARCHAR(200),
                emergency_contact_phone VARCHAR(50),
                emergency_contact_relationship VARCHAR(100),
                job_title VARCHAR(200) NOT NULL,
                job_level VARCHAR(50),
                career_level VARCHAR(50),
                worker_category VARCHAR(50),
                department_id UUID REFERENCES departments(id),
                manager_employee_code VARCHAR(20),
                employment_type employment_type DEFAULT 'permanent',
                employee_status employee_status DEFAULT 'active',
                employment_start_date DATE NOT NULL,
                employment_end_date DATE,
                hire_source VARCHAR(100),
                contract_reference VARCHAR(100),
                work_location VARCHAR(200),
                work_mode work_mode,
                shift_type shift_type,
                working_hours_per_week DECIMAL(5,2),
                working_days_per_week INTEGER,
                probation_start_date DATE,
                probation_end_date DATE,
                base_salary DECIMAL(15,2) NOT NULL,
                salary_currency VARCHAR(10) DEFAULT 'XOF',
                salary_frequency salary_frequency DEFAULT 'monthly',
                salary_effective_date DATE,
                bank_id UUID REFERENCES banks(id),
                bank_account_number VARCHAR(100),
                bank_iban VARCHAR(50),
                bank_bic VARCHAR(20),
                preferred_payment_method VARCHAR(50),
                mobile_money_provider VARCHAR(50),
                mobile_money_number VARCHAR(50),
                leave_balance DECIMAL(8,2) DEFAULT 0,
                monthly_leave_accrual DECIMAL(5,2) DEFAULT 2.5,
                education_level VARCHAR(100),
                education_institution VARCHAR(200),
                diploma VARCHAR(200),
                diploma_year INTEGER,
                health_insurance_provider VARCHAR(200),
                insurance_policy_number VARCHAR(100),
                last_medical_check_date DATE,
                medical_restrictions TEXT,
                disability_status VARCHAR(50),
                pension_plan VARCHAR(100),
                benefits_eligible BOOLEAN DEFAULT false,
                benefit_start_date DATE,
                bonus_eligible BOOLEAN DEFAULT false,
                overtime_eligible BOOLEAN DEFAULT true,
                succession_eligible BOOLEAN DEFAULT false,
                user_account_enabled BOOLEAN DEFAULT false,
                performance_rating DECIMAL(3,1),
                last_promotion_date DATE,
                avatar_url TEXT,
                system_role VARCHAR(50),
                employee_file_status VARCHAR(50),
                compliance_status VARCHAR(50),
                last_login_at TIMESTAMPTZ,
                created_by UUID,
                updated_by UUID,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // FK manager_id in departments
        await queryRunner.query(`ALTER TABLE departments ADD CONSTRAINT fk_dept_manager FOREIGN KEY (manager_id) REFERENCES employees(id);`);

        // Contracts
        await queryRunner.query(`
            CREATE TABLE contracts (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                contract_number VARCHAR(50) UNIQUE NOT NULL,
                employee_id UUID REFERENCES employees(id) NOT NULL,
                contract_type contract_type NOT NULL,
                status contract_status DEFAULT 'draft',
                job_title VARCHAR(200) NOT NULL,
                job_description TEXT,
                department VARCHAR(200),
                start_date DATE NOT NULL,
                end_date DATE,
                trial_period_days INTEGER,
                trial_end_date DATE,
                signature_date DATE,
                base_salary DECIMAL(15,2) NOT NULL,
                salary_currency VARCHAR(10) DEFAULT 'XOF',
                salary_frequency salary_frequency,
                working_hours_per_week DECIMAL(5,2),
                working_days_per_week INTEGER,
                work_location VARCHAR(200),
                work_mode work_mode,
                classification VARCHAR(50),
                coefficient VARCHAR(50),
                collective_agreement VARCHAR(200),
                notice_period_days INTEGER,
                is_renewable BOOLEAN DEFAULT false,
                renewal_terms TEXT,
                renewed_from_id UUID REFERENCES contracts(id),
                bonus_clause TEXT,
                benefits_description TEXT,
                notes TEXT,
                document_url TEXT,
                signed_document_url TEXT,
                termination_date DATE,
                termination_reason TEXT,
                termination_notice_date DATE,
                created_by UUID,
                updated_by UUID,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // Leaves
        await queryRunner.query(`
            CREATE TABLE leave_types (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                default_days INTEGER DEFAULT 0,
                is_paid BOOLEAN DEFAULT true,
                requires_justification BOOLEAN DEFAULT false,
                max_consecutive_days INTEGER,
                is_active BOOLEAN DEFAULT true,
                color VARCHAR(20),
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE leave_requests (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) NOT NULL,
                leave_type_id UUID REFERENCES leave_types(id) NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                days_count DECIMAL(5,1) NOT NULL,
                reason TEXT,
                status VARCHAR(20) DEFAULT 'pending',
                approved_by UUID REFERENCES users(id),
                approved_at TIMESTAMPTZ,
                rejection_reason TEXT,
                document_url TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE leave_balances (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) NOT NULL,
                leave_type_id UUID REFERENCES leave_types(id) NOT NULL,
                year INTEGER NOT NULL,
                entitled_days DECIMAL(5,1) DEFAULT 0,
                taken_days DECIMAL(5,1) DEFAULT 0,
                pending_days DECIMAL(5,1) DEFAULT 0,
                carried_over_days DECIMAL(5,1) DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now(),
                UNIQUE(employee_id, leave_type_id, year)
            );
        `);

        // Payslips
        await queryRunner.query(`
            CREATE TABLE payslips (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID REFERENCES employees(id) NOT NULL,
                period_month INTEGER NOT NULL,
                period_year INTEGER NOT NULL,
                gross_salary DECIMAL(15,2) NOT NULL,
                net_salary DECIMAL(15,2) NOT NULL,
                base_salary DECIMAL(15,2) NOT NULL,
                total_premiums DECIMAL(15,2) DEFAULT 0,
                total_deductions DECIMAL(15,2) DEFAULT 0,
                employee_contributions DECIMAL(15,2) DEFAULT 0,
                employer_contributions DECIMAL(15,2) DEFAULT 0,
                tax_amount DECIMAL(15,2) DEFAULT 0,
                premiums_detail JSONB DEFAULT '[]',
                deductions_detail JSONB DEFAULT '[]',
                working_days INTEGER,
                worked_days INTEGER,
                overtime_hours DECIMAL(8,2) DEFAULT 0,
                absence_days DECIMAL(5,1) DEFAULT 0,
                status VARCHAR(20) DEFAULT 'draft',
                validated_by UUID,
                validated_at TIMESTAMPTZ,
                paid_at TIMESTAMPTZ,
                document_url TEXT,
                notes TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE payslips`);
        await queryRunner.query(`DROP TABLE leave_balances`);
        await queryRunner.query(`DROP TABLE leave_requests`);
        await queryRunner.query(`DROP TABLE leave_types`);
        await queryRunner.query(`DROP TABLE contracts`);
        await queryRunner.query(`ALTER TABLE departments DROP CONSTRAINT fk_dept_manager`);
        await queryRunner.query(`DROP TABLE employees`);
        await queryRunner.query(`DROP TABLE banks`);
        await queryRunner.query(`DROP TABLE departments`);
        await queryRunner.query(`DROP TABLE company_settings`);
        await queryRunner.query(`DROP TABLE user_permissions`);
        await queryRunner.query(`DROP TABLE role_permissions`);
        await queryRunner.query(`DROP TABLE permissions`);
        await queryRunner.query(`DROP TABLE user_roles`);
        await queryRunner.query(`DROP TABLE users`);
        
        await queryRunner.query(`DROP TYPE expense_status`);
        await queryRunner.query(`DROP TYPE evaluation_status`);
        await queryRunner.query(`DROP TYPE training_status`);
        await queryRunner.query(`DROP TYPE recruitment_status`);
        await queryRunner.query(`DROP TYPE application_status`);
        await queryRunner.query(`DROP TYPE marriage_regime`);
        await queryRunner.query(`DROP TYPE marital_status`);
        await queryRunner.query(`DROP TYPE civility_type`);
        await queryRunner.query(`DROP TYPE gender_type`);
        await queryRunner.query(`DROP TYPE shift_type`);
        await queryRunner.query(`DROP TYPE work_mode`);
        await queryRunner.query(`DROP TYPE salary_frequency`);
        await queryRunner.query(`DROP TYPE contract_status`);
        await queryRunner.query(`DROP TYPE contract_type`);
        await queryRunner.query(`DROP TYPE employment_type`);
        await queryRunner.query(`DROP TYPE employee_status`);
        await queryRunner.query(`DROP TYPE password_status`);
        await queryRunner.query(`DROP TYPE app_role`);
    }
}
