import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('country_tax_settings')
export class CountryTaxSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  country_name: string;

  @Column({ length: 10 })
  country_code: string;

  @Column({ length: 10, default: 'XOF' })
  currency_code: string;

  @Column({ length: 10, default: 'FCFA' })
  currency_symbol: string;

  @Column({ type: 'jsonb', default: [] })
  income_tax_brackets: any[];

  @Column({ type: 'jsonb', default: [] })
  social_contributions: any[];

  @Column({ type: 'jsonb', default: [] })
  employer_charges: any[];

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 18 })
  vat_rate: number;

  @Column({ type: 'int', default: 1 })
  fiscal_year_start_month: number;

  @Column({ type: 'jsonb', default: {} })
  tax_rules: any;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('salary_grid')
export class SalaryGridItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  category: string;

  @Column({ length: 50 })
  echelon: string;

  @Column({ length: 50, nullable: true })
  education_level: string;

  @Column({ type: 'int', default: 100 })
  base_index: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  index_value: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  min_salary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  max_salary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourly_rate: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  class: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  seniority_bonus_rate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  performance_bonus_rate: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  transport_allowance: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  housing_allowance: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  employer_charges_rate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  employee_charges_rate: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  total_gross: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  net_salary: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
