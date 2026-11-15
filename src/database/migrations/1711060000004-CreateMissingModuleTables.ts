import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMissingModuleTables1711060000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 0. FIX PERMISSIONS & ROLE_PERMISSIONS COLUMNS
    await queryRunner.query(`
      ALTER TABLE permissions 
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

      ALTER TABLE role_permissions 
      ADD COLUMN IF NOT EXISTS permission_code VARCHAR(100);

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'uq_role_permissions_role_code'
        ) THEN
          ALTER TABLE role_permissions 
          ADD CONSTRAINT uq_role_permissions_role_code UNIQUE (role, permission_code);
        END IF;
      EXCEPTION WHEN OTHERS THEN
        NULL;
      END
      $$;
    `);

    // 1. CONTRACT TYPES
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS contract_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        is_permanent BOOLEAN DEFAULT true,
        is_active BOOLEAN DEFAULT true,
        default_trial_period_days INTEGER DEFAULT 30,
        default_notice_period_days INTEGER DEFAULT 30,
        suggested_worker_category VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // Add contract_type_id to contracts if missing
    await queryRunner.query(`
      ALTER TABLE contracts
      ADD COLUMN IF NOT EXISTS contract_type_id UUID REFERENCES contract_types(id) ON DELETE SET NULL;
    `);

    // 2. ACCOUNTING MAPPINGS
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'accounting_mappings_entrytype_enum') THEN
          CREATE TYPE accounting_mappings_entrytype_enum AS ENUM ('debit', 'credit');
        END IF;
      END
      $$;

      CREATE TABLE IF NOT EXISTS accounting_mappings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        rubric_name VARCHAR(255) NOT NULL,
        account_number VARCHAR(50) NOT NULL,
        account_name VARCHAR(255),
        entry_type accounting_mappings_entrytype_enum DEFAULT 'debit',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 3. POSITIONS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS positions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) UNIQUE NOT NULL,
        description TEXT,
        department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 4. CURRENCIES
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS currencies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        symbol VARCHAR(10),
        exchange_rate DECIMAL(15,6) DEFAULT 1,
        is_default BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 5. ESTABLISHMENTS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS establishments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        code_ape VARCHAR(50),
        sector VARCHAR(100),
        registration_number VARCHAR(100),
        tax_id VARCHAR(100),
        address_line1 TEXT,
        city VARCHAR(100),
        postal_code VARCHAR(50),
        is_main BOOLEAN DEFAULT false,
        company_id UUID,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 6. HOLIDAYS & HOLIDAY PLANS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS holidays (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(200) NOT NULL,
        date DATE NOT NULL,
        type VARCHAR(50) DEFAULT 'public',
        is_recurring BOOLEAN DEFAULT true,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS holiday_plans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        approved_by UUID,
        approved_at TIMESTAMPTZ,
        rejection_reason TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 7. HR DOCUMENTS & SIGNATURES
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hr_documents_type_enum') THEN
          CREATE TYPE hr_documents_type_enum AS ENUM ('contract', 'payslip', 'certificate', 'id_proof', 'resume', 'diploma', 'other');
        END IF;
      END
      $$;

      CREATE TABLE IF NOT EXISTS hr_documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(255) NOT NULL,
        type hr_documents_type_enum DEFAULT 'other',
        category VARCHAR(100),
        file_url TEXT,
        file_name VARCHAR(255),
        file_size INTEGER,
        mime_type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS document_signatures (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        document_id UUID REFERENCES hr_documents(id) ON DELETE CASCADE NOT NULL,
        signer_id UUID,
        signer_name VARCHAR(200) NOT NULL,
        signer_email VARCHAR(200),
        signature_type VARCHAR(50) DEFAULT 'drawn',
        signature_image_url TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        validation_code VARCHAR(100),
        signed_at TIMESTAMPTZ DEFAULT now(),
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 8. VEHICLES (FLEET) & WORK ACCIDENTS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        chassis_number VARCHAR(100),
        type VARCHAR(50),
        color VARCHAR(50),
        manufacture_year INTEGER,
        status VARCHAR(50) DEFAULT 'available',
        current_employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
        assignment_date DATE,
        insurance_expiry DATE,
        last_maintenance DATE,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS work_accidents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        accident_date DATE NOT NULL,
        accident_time TIME,
        location VARCHAR(300) NOT NULL,
        description TEXT NOT NULL,
        severity VARCHAR(50),
        injury_type VARCHAR(100),
        body_parts_affected TEXT,
        witnesses TEXT,
        status VARCHAR(50) DEFAULT 'declared',
        work_days_lost INTEGER DEFAULT 0,
        medical_leave_start DATE,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 9. ANNOUNCEMENTS & ATTENDANCE
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        is_urgent BOOLEAN DEFAULT false,
        expires_at TIMESTAMPTZ,
        image_url TEXT,
        author_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS attendance_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        date DATE NOT NULL,
        check_in TIME,
        check_out TIME,
        status VARCHAR(50),
        hours_worked DECIMAL(5,2),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 10. RECRUITMENT (JOB POSTINGS, APPLICATIONS, EVALUATIONS, TALENT POOL)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS job_postings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        department VARCHAR(100) NOT NULL,
        description TEXT,
        requirements TEXT,
        salary_range VARCHAR(100),
        location VARCHAR(100),
        contract_type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS job_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE NOT NULL,
        candidate_name VARCHAR(200) NOT NULL,
        candidate_email VARCHAR(200) NOT NULL,
        candidate_phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        interview_date TIMESTAMPTZ,
        score FLOAT,
        resume_url TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS candidate_evaluations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
        evaluator_id UUID REFERENCES users(id) ON DELETE SET NULL,
        criteria JSONB DEFAULT '{}',
        comments TEXT,
        score DECIMAL(5,2),
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS talent_pool (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL,
        phone VARCHAR(50),
        skills JSONB DEFAULT '[]',
        notes TEXT,
        resume_url TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 11. MEDICAL ASSISTANCE, DISCIPLINARY ACTIONS & DEPARTURES
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS medical_assistances (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT,
        amount DECIMAL(12,2) DEFAULT 0,
        request_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS disciplinary_actions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        type VARCHAR(100) NOT NULL,
        reason TEXT NOT NULL,
        action_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS employee_departures (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        departure_date DATE NOT NULL,
        reason VARCHAR(100) NOT NULL,
        comments TEXT,
        status VARCHAR(50) DEFAULT 'in_progress',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 12. APPROVAL WORKFLOWS & EXPENSES
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS approval_workflows (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(200) NOT NULL,
        module VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS approval_steps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        workflow_id UUID REFERENCES approval_workflows(id) ON DELETE CASCADE NOT NULL,
        step_order INTEGER NOT NULL,
        approver_role VARCHAR(100),
        approver_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS approval_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        workflow_id UUID REFERENCES approval_workflows(id) ON DELETE CASCADE,
        entity_id UUID NOT NULL,
        entity_type VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        current_step INTEGER DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS approval_actions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id UUID REFERENCES approval_requests(id) ON DELETE CASCADE NOT NULL,
        approver_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(50) NOT NULL,
        comment TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS expense_claims (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(200) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        category VARCHAR(100),
        receipt_url TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        claim_date DATE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 13. TRAININGS, ONBOARDING, EVALUATIONS, CAREER & SURVEYS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS trainings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT,
        trainer VARCHAR(200),
        start_date DATE NOT NULL,
        end_date DATE,
        status VARCHAR(50) DEFAULT 'planned',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS training_enrollments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        training_id UUID REFERENCES trainings(id) ON DELETE CASCADE NOT NULL,
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        status VARCHAR(50) DEFAULT 'enrolled',
        score DECIMAL(5,2),
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS training_budgets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        year INTEGER NOT NULL,
        department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
        allocated_amount DECIMAL(15,2) DEFAULT 0,
        spent_amount DECIMAL(15,2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS onboarding_checklists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(200) NOT NULL,
        status VARCHAR(50) DEFAULT 'in_progress',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS onboarding_tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        checklist_id UUID REFERENCES onboarding_checklists(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(200) NOT NULL,
        is_completed BOOLEAN DEFAULT false,
        due_date DATE,
        assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS evaluations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        evaluator_id UUID REFERENCES users(id) ON DELETE SET NULL,
        evaluation_date DATE NOT NULL,
        rating DECIMAL(5,2),
        feedback TEXT,
        goals JSONB DEFAULT '[]',
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS career_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(200) NOT NULL,
        department VARCHAR(100),
        start_date DATE NOT NULL,
        end_date DATE,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS surveys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT,
        questions JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT true,
        expires_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS employee_benefits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        benefit_name VARCHAR(200) NOT NULL,
        amount DECIMAL(12,2) DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // 14. PAYMENTS & PAYROLL ADDITIONS
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'bank_transfer',
        payment_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'completed',
        reference VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS employee_premiums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        name VARCHAR(150) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        is_taxable BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS on_call_duties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        compensation DECIMAL(12,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'completed',
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS performance_bonuses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        period VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS premium_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        default_amount DECIMAL(15,2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS salary_deductions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        type VARCHAR(100) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        reason TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS certificate_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
        type VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS user_extra_permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reversible if needed
  }
}

