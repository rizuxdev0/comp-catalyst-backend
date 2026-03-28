import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employee_surveys')
export class EmployeeSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, default: 'survey' })
  type: string;

  @Column({ type: 'jsonb', default: [] })
  questions: any[];

  @Column({ length: 20, default: 'draft' })
  status: string;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column({ default: true })
  is_anonymous: boolean;

  @Column({ length: 50, default: 'all' })
  target_audience: string;

  @Column({ type: 'uuid', nullable: true })
  target_department_id: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('suggestion_box')
export class SuggestionBoxItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  employee_id: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 50, default: 'general' })
  category: string;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ default: false })
  is_anonymous: boolean;

  @Column({ type: 'int', default: 0 })
  votes_count: number;

  @Column({ type: 'text', nullable: true })
  admin_response: string;

  @Column({ type: 'uuid', nullable: true })
  responded_by: string;

  @Column({ type: 'timestamptz', nullable: true })
  responded_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('suggestion_votes')
export class SuggestionVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  suggestion_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ length: 10, default: 'up' })
  vote_type: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity('survey_responses')
export class SurveyResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  survey_id: string;

  @Column({ type: 'uuid', nullable: true })
  respondent_id: string;

  @Column({ type: 'jsonb', default: [] })
  answers: any[];

  @Column({ type: 'text', nullable: true })
  suggestion_text: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @CreateDateColumn()
  submitted_at: Date;
}
