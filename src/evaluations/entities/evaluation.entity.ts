import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'uuid', nullable: true })
  evaluator_id: string | null;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: Employee;

  @Column({ length: 50, default: 'annual' })
  evaluation_type: string; // annual, probation, quarterly, 360

  @Column({ length: 50, nullable: true })
  period: string | null; // ex: "2025", "Q1 2025"

  @Column({ length: 20, default: 'pending' })
  status: string; // pending, in_progress, completed

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  overall_rating: number | null; // 0.0 – 5.0

  @Column({ type: 'jsonb', nullable: true })
  objectives: any; // [{title, target, result, rating}]

  @Column({ type: 'text', nullable: true })
  strengths: string | null;

  @Column({ type: 'text', nullable: true })
  areas_of_improvement: string | null;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @Column({ type: 'text', nullable: true })
  employee_comments: string | null;

  @Column({ type: 'text', nullable: true })
  action_plan: string | null;

  @Column({ type: 'date', nullable: true })
  evaluation_date: string | null;

  @Column({ type: 'date', nullable: true })
  next_evaluation_date: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
