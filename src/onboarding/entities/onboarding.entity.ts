import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('onboarding_checklists')
export class OnboardingChecklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'date', nullable: true })
  start_date: string | null;

  @Column({ type: 'date', nullable: true })
  target_completion_date: string | null;

  @Column({ length: 20, default: 'pending' })
  status: string; // pending, in_progress, completed

  @Column({ type: 'int', default: 0 })
  progress_percentage: number;

  @Column({ type: 'uuid', nullable: true })
  assigned_to: string | null; // RH responsible

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

@Entity('onboarding_tasks')
export class OnboardingTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  checklist_id: string;

  @ManyToOne(() => OnboardingChecklist)
  @JoinColumn({ name: 'checklist_id' })
  checklist: OnboardingChecklist;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ length: 50, default: 'general' })
  category: string; // documents, equipment, training, access, meeting

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ default: false })
  is_completed: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date | null;

  @Column({ type: 'uuid', nullable: true })
  completed_by: string | null;

  @Column({ type: 'date', nullable: true })
  due_date: string | null;

  @Column({ default: false })
  is_required: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
