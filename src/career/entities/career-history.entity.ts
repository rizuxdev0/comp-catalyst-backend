import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Contract } from '../../contracts/entities/contract.entity';

@Entity('career_history')
export class CareerHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  event_type: string; // promotion, mutation, augmentation, changement_poste, changement_dept

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  event_date: string;

  @Column({ type: 'date' })
  effective_date: string;

  @Column({ length: 200, nullable: true })
  previous_job_title: string | null;

  @Column({ length: 200, nullable: true })
  new_job_title: string | null;

  @Column({ length: 200, nullable: true })
  previous_department: string | null;

  @Column({ length: 200, nullable: true })
  new_department: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  previous_salary: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  new_salary: number | null;

  @Column({ type: 'jsonb', nullable: true })
  previous_value: any;

  @Column({ type: 'jsonb', nullable: true })
  new_value: any;

  @Column({ type: 'text', nullable: true })
  reason: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'text', nullable: true })
  document_url: string | null;

  @Column({ type: 'uuid', nullable: true })
  previous_contract_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  new_contract_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  approved_by: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  approved_at: Date | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
