import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contract_type_settings')
export class ContractTypeSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'max_duration_months', type: 'int', nullable: true })
  max_duration_months: number;

  @Column({ default: false })
  renewable: boolean;

  @Column({ name: 'max_renewals', type: 'int', default: 0 })
  max_renewals: number;

  @Column({ name: 'trial_period_days', type: 'int', default: 0 })
  trial_period_days: number;

  @Column({ name: 'notice_period_days', type: 'int', default: 30 })
  notice_period_days: number;

  @Column({ name: 'requires_end_date', default: false })
  requires_end_date: boolean;

  @Column({ name: 'specific_rules', type: 'jsonb', default: {} })
  specific_rules: any;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
