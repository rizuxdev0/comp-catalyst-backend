import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../departments/entities/department.entity';

@Entity('communications')
export class Communication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 50, default: 'note_service' })
  document_type: string; // note_service, circulaire, memo, annonce, convocation

  @Column({ length: 50, default: 'all' })
  recipient_type: string; // all, department, employee

  @Column({ type: 'uuid', nullable: true })
  recipient_employee_id: string | null;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'recipient_employee_id' })
  recipient_employee: Employee;

  @Column({ type: 'uuid', nullable: true })
  recipient_department_id: string | null;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'recipient_department_id' })
  recipient_department: Department;

  @Column({ length: 20, default: 'draft' })
  status: string; // draft, published, archived

  @Column({ type: 'timestamptz', nullable: true })
  published_at: Date | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
