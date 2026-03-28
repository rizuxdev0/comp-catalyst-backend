import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('work_accidents')
export class WorkAccident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  accident_date: string;

  @Column({ type: 'time', nullable: true })
  accident_time: string | null;

  @Column({ length: 300 })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 20, nullable: true })
  severity: string | null; // light, moderate, severe, fatal

  @Column({ length: 100, nullable: true })
  injury_type: string | null;

  @Column({ type: 'simple-array', nullable: true })
  body_parts_affected: string[];

  @Column({ type: 'simple-array', nullable: true })
  witnesses: string[];

  @Column({ length: 20, default: 'declared' })
  status: string; // declared, investigating, closed, compensated

  @Column({ type: 'int', default: 0 })
  work_days_lost: number;

  @Column({ type: 'date', nullable: true })
  medical_leave_start: string | null;

  @Column({ type: 'date', nullable: true })
  medical_leave_end: string | null;

  @Column({ length: 100, nullable: true })
  declaration_number: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
