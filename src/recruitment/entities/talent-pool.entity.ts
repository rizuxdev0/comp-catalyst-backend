import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('talent_pool')
export class TalentPool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'candidate_name' })
  candidateName: string;

  @Column({ name: 'candidate_email' })
  candidateEmail: string;

  @Column({ name: 'candidate_phone', nullable: true })
  candidatePhone: string;

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

  @Column({ name: 'experience_years', type: 'int', nullable: true })
  experienceYears: number;

  @Column({ name: 'current_position', nullable: true })
  currentPosition: string;

  @Column({ name: 'desired_position', nullable: true })
  desiredPosition: string;

  @Column({ name: 'salary_expectation', nullable: true })
  salaryExpectation: string;

  @Column({ nullable: true })
  source: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'int', default: 3 })
  rating: number;

  @Column({ name: 'is_available', default: true })
  isAvailable: boolean;

  @Column({ name: 'cv_url', nullable: true })
  cvUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
