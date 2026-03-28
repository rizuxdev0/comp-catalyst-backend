import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  application_id: string;

  @Column({ length: 200, nullable: true })
  candidate_name: string;

  @Column({ length: 200, nullable: true })
  position: string;

  @Column({ length: 50, default: 'on_site' })
  interview_type: string;

  @Column({ type: 'timestamptz' })
  scheduled_date: Date;

  @Column({ type: 'int', default: 60 })
  duration_minutes: number;

  @Column({ length: 200, nullable: true })
  location: string;

  @Column({ type: 'jsonb', default: [] })
  interviewers: any[];

  @Column({ length: 20, default: 'scheduled' })
  status: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
