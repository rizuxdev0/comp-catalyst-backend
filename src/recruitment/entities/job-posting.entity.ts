import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { JobApplication } from './job-application.entity';

export enum RecruitmentStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ name: 'salary_range', nullable: true })
  salaryRange: string;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'contract_type', nullable: true })
  contractType: string;

  @Column({
    type: 'enum',
    enum: RecruitmentStatus,
    default: RecruitmentStatus.OPEN,
  })
  status: RecruitmentStatus;

  @OneToMany(() => JobApplication, (application: JobApplication) => application.jobPosting)
  applications: JobApplication[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
