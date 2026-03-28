import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hr_tickets')
export class HRTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  ticket_number: string;

  @Column({ type: 'uuid', nullable: true })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 200 })
  subject: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 20, default: 'medium' })
  priority: string;

  @Column({ length: 20, default: 'open' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  assigned_to: string;

  @Column({ type: 'text', nullable: true })
  resolution: string;

  @Column({ type: 'timestamptz', nullable: true })
  resolved_at: Date;

  @Column({ type: 'uuid', nullable: true })
  resolved_by: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

@Entity('ticket_messages')
export class TicketMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  ticket_id: string;

  @Column({ type: 'uuid', nullable: true })
  sender_id: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: false })
  is_internal: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

@Entity('hr_faq')
export class HRFAQ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  order_index: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'int', default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
