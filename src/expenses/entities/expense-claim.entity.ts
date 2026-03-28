import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('expense_claims')
export class ExpenseClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  type: string; // 'travel' | 'meal' | 'office' | 'other'

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ name: 'expense_date', type: 'date' })
  expenseDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'receipt_url', nullable: true })
  receiptUrl: string;

  @Column({ default: 'pending' })
  status: string; // 'pending' | 'approved' | 'rejected' | 'paid'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
