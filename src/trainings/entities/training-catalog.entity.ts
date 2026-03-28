import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('training_catalog')
export class TrainingCatalogItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50, default: 'technical' })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  duration_hours: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  cost_per_participant: number;

  @Column({ length: 200, nullable: true })
  provider: string;

  @Column({ default: false })
  certification_available: boolean;

  @Column({ length: 200, nullable: true })
  certification_name: string;

  @Column({ type: 'jsonb', default: [] })
  skills_covered: string[];

  @Column({ type: 'text', nullable: true })
  prerequisites: string;

  @Column({ length: 200, nullable: true })
  target_audience: string;

  @Column({ length: 50, default: 'in_person' })
  delivery_mode: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50, default: 'technical' })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 5 })
  level_scale: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200, nullable: true })
  issuing_body: string;

  @Column({ type: 'int', nullable: true })
  validity_months: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('employee_skills')
export class EmployeeSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  skill_id: string;

  @Column({ type: 'int', default: 1 })
  current_level: number;

  @Column({ type: 'int', default: 3 })
  target_level: number;

  @Column({ type: 'timestamptz', nullable: true })
  assessed_at: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('employee_certifications')
export class EmployeeCertification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  certification_id: string;

  @Column({ type: 'date' })
  obtained_date: string;

  @Column({ type: 'date', nullable: true })
  expiry_date: string;

  @Column({ type: 'text', nullable: true })
  certificate_url: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('development_plans')
export class DevelopmentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  target_date: string;

  @Column({ length: 20, default: 'draft' })
  status: string;

  @Column({ type: 'jsonb', default: [] })
  objectives: any[];

  @Column({ type: 'int', default: 0 })
  progress_percentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('training_evaluations')
export class TrainingEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  training_id: string;

  @Column({ type: 'uuid', nullable: true })
  employee_id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'timestamptz', nullable: true })
  evaluated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
