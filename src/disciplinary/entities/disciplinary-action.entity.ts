import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('disciplinary_actions')
export class DisciplinaryAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  type: string; // avertissement, mise_en_demeure, blâme, suspension, licenciement

  @Column({ length: 20, default: 'minor' })
  severity: string; // minor, major, critical

  @Column({ type: 'date' })
  incident_date: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  decision: string | null;

  @Column({ type: 'date', nullable: true })
  decision_date: string | null;

  @Column({ length: 20, default: 'pending' })
  status: string; // pending, in_review, resolved, appealed

  @Column({ type: 'int', nullable: true })
  suspension_days: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  salary_impact: number | null;

  @Column({ type: 'text', nullable: true })
  evidence_url: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
