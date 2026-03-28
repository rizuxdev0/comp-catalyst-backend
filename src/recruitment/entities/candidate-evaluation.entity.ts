import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobApplication } from './job-application.entity';

@Entity('candidate_evaluations')
export class CandidateEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => JobApplication)
  @JoinColumn({ name: 'application_id' })
  application: JobApplication;

  @Column({ name: 'evaluator_name' })
  evaluatorName: string;

  @Column({ name: 'evaluator_email', nullable: true })
  evaluatorEmail: string;

  @Column({ type: 'jsonb', nullable: true })
  criteria: any[];

  @Column({ name: 'overall_score', type: 'float', default: 0 })
  overallScore: number;

  @Column({ name: 'overall_comment', type: 'text', nullable: true })
  overallComment: string;

  @Column()
  recommendation: string;

  @CreateDateColumn({ name: 'evaluated_at' })
  evaluatedAt: Date;
}
