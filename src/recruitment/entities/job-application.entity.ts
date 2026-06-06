import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobPosting } from './job-posting.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  SCREENING = 'screening',
  INTERVIEW = 'interview',
  TESTING = 'testing',
  OFFER = 'offer',
  HIRED = 'hired',
  REJECTED = 'rejected',
}

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_posting_id', type: 'uuid' })
  jobPostingId: string;

  @ManyToOne(() => JobPosting, posting => posting.applications)
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;

  @Column({ name: 'candidate_name' })
  candidateName: string;

  @Column({ name: 'candidate_email' })
  candidateEmail: string;

  @Column({ name: 'candidate_phone', nullable: true })
  candidatePhone: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: ApplicationStatus.PENDING,
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'interview_date', type: 'timestamp', nullable: true })
  interviewDate: Date;

  @Column({ type: 'int', nullable: true })
  score: number;

  @Column({ name: 'cv_url', nullable: true })
  cvUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
