import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTicketsAndPasswordPolicy1711060000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // ==================== PASSWORD POLICY ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS password_policy (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                min_length INTEGER DEFAULT 8,
                require_uppercase BOOLEAN DEFAULT true,
                require_lowercase BOOLEAN DEFAULT true,
                require_digit BOOLEAN DEFAULT true,
                require_special_char BOOLEAN DEFAULT true,
                temp_password_expiry_hours INTEGER DEFAULT 48,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== HR TICKETS ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS hr_tickets (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                ticket_number VARCHAR(50) UNIQUE NOT NULL,
                employee_id UUID REFERENCES employees(id),
                user_id UUID REFERENCES users(id),
                category VARCHAR(100) NOT NULL,
                subject VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                priority VARCHAR(20) DEFAULT 'medium',
                status VARCHAR(20) DEFAULT 'open',
                assigned_to UUID REFERENCES users(id),
                resolution TEXT,
                resolved_at TIMESTAMPTZ,
                resolved_by UUID REFERENCES users(id),
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== TICKET MESSAGES ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ticket_messages (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                ticket_id UUID REFERENCES hr_tickets(id) ON DELETE CASCADE NOT NULL,
                sender_id UUID REFERENCES users(id),
                message TEXT NOT NULL,
                is_internal BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT now()
            );
        `);

        // ==================== HR FAQ ====================
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS hr_faq (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                category VARCHAR(100),
                order_index INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT true,
                views INTEGER DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS hr_faq`);
        await queryRunner.query(`DROP TABLE IF EXISTS ticket_messages`);
        await queryRunner.query(`DROP TABLE IF EXISTS hr_tickets`);
        await queryRunner.query(`DROP TABLE IF EXISTS password_policy`);
    }
}
