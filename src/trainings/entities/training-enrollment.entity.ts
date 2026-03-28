import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Training } from './training.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('training_enrollments')
export class TrainingEnrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'training_id', type: 'uuid' })
  trainingId: string;

  @ManyToOne(() => Training, (training) => training.enrollments)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @CreateDateColumn({ name: 'enrolled_at' })
  enrolledAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp with time zone', nullable: true })
  completedAt: Date;

  @Column({ name: 'certification_url', nullable: true })
  certificationUrl: string;

  @Column({ default: 'enrolled' })
  status: string; // 'enrolled' | 'completed' | 'failed' | 'cancelled'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
