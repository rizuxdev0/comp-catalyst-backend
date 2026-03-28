import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('employee_departures')
export class Departure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  departure_type: string; // resignation, dismissal, retirement, end_of_contract, mutual_agreement, death

  @Column({ type: 'date' })
  notice_date: string;

  @Column({ type: 'date' })
  last_working_day: string;

  @Column({ type: 'date', nullable: true })
  effective_departure_date: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  severance_amount: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  leave_payout: number | null;

  @Column({ length: 20, default: 'pending' })
  status: string; // pending, in_progress, completed, cancelled

  @Column({ default: false })
  exit_interview_done: boolean;

  @Column({ type: 'text', nullable: true })
  exit_interview_notes: string | null;

  @Column({ default: false })
  equipment_returned: boolean;

  @Column({ default: false })
  access_revoked: boolean;

  @Column({ type: 'text', nullable: true })
  document_url: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
