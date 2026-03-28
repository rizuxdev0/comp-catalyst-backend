import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ length: 50, default: 'survey' })
  type: string; // survey, suggestion, poll

  @Column({ type: 'jsonb', default: [] })
  questions: any[]; // [{id, text, type: 'text'|'rating'|'choice', options?:[]}]

  @Column({ length: 20, default: 'draft' })
  status: string; // draft, active, closed

  @Column({ type: 'date', nullable: true })
  start_date: string | null;

  @Column({ type: 'date', nullable: true })
  end_date: string | null;

  @Column({ default: true })
  is_anonymous: boolean;

  @Column({ length: 50, default: 'all' })
  target_audience: string; // all, department, role

  @Column({ type: 'uuid', nullable: true })
  target_department_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

@Entity('survey_responses')
export class SurveyResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  survey_id: string;

  @Column({ type: 'uuid', nullable: true })
  respondent_id: string | null; // null if anonymous

  @Column({ type: 'jsonb', default: [] })
  answers: any[]; // [{question_id, answer}]

  @Column({ type: 'text', nullable: true })
  suggestion_text: string | null; // for suggestion type

  @Column({ type: 'int', nullable: true })
  rating: number | null;

  @CreateDateColumn({ type: 'timestamptz' })
  submitted_at: Date;
}
