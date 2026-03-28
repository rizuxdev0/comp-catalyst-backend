import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TrainingEnrollment } from './training-enrollment.entity';

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  trainer: string;

  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp with time zone' })
  endDate: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'max_participants', type: 'int', nullable: true })
  maxParticipants: number;

  @Column({ default: 'planned' })
  status: string; // 'planned' | 'in_progress' | 'completed' | 'cancelled'

  @OneToMany(() => TrainingEnrollment, (enrollment) => enrollment.training)
  enrollments: TrainingEnrollment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
