import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('employee_benefits')
export class EmployeeBenefit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 100 })
  benefit_type: string; // health_insurance, life_insurance, meal_voucher, transport, phone, car, housing

  @Column({ length: 200, nullable: true })
  provider: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  employer_contribution: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  employee_contribution: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  total_value: number | null;

  @Column({ type: 'date', nullable: true })
  start_date: string | null;

  @Column({ type: 'date', nullable: true })
  end_date: string | null;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
