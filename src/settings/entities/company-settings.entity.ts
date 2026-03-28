import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('company_settings')
export class CompanySettings {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'company_name', default: 'Mon Entreprise' })
  @ApiProperty({ example: 'Eco HR Solution' })
  company_name: string;

  @Column({ name: 'legal_form', nullable: true })
  @ApiProperty({ required: false })
  legal_form: string;

  @Column({ name: 'registration_number', nullable: true })
  @ApiProperty({ required: false })
  registration_number: string;

  @Column({ name: 'tax_id', nullable: true })
  @ApiProperty({ required: false })
  tax_id: string;

  @Column({ name: 'address_line1', nullable: true })
  @ApiProperty({ required: false })
  address_line1: string;

  @Column({ name: 'address_line2', nullable: true })
  @ApiProperty({ required: false })
  address_line2: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  city: string;

  @Column({ name: 'state_province', nullable: true })
  @ApiProperty({ required: false })
  state_province: string;

  @Column({ name: 'postal_code', nullable: true })
  @ApiProperty({ required: false })
  postal_code: string;

  @Column({ default: 'Togo' })
  @ApiProperty({ example: 'Togo' })
  country: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  website: string;

  @Column({ name: 'logo_url', nullable: true })
  @ApiProperty({ required: false })
  logo_url: string;

  @Column({ name: 'currency_code', default: 'XOF' })
  @ApiProperty({ example: 'XOF' })
  currency_code: string;

  @Column({ name: 'currency_symbol', default: 'FCFA' })
  @ApiProperty({ example: 'FCFA' })
  currency_symbol: string;

  @Column({ name: 'date_format', default: 'dd/MM/yyyy' })
  @ApiProperty({ example: 'dd/MM/yyyy' })
  date_format: string;

  @Column({ name: 'time_format', default: 'HH:mm' })
  @ApiProperty({ example: 'HH:mm' })
  time_format: string;

  @Column({ default: 'Africa/Lome' })
  @ApiProperty({ example: 'Africa/Lome' })
  timezone: string;

  @Column({ default: 'fr' })
  @ApiProperty({ example: 'fr' })
  language: string;

  @Column({ name: 'work_days_per_month', type: 'decimal', precision: 5, scale: 2, default: 22 })
  @ApiProperty({ example: 22 })
  work_days_per_month: number;

  @Column({ name: 'work_hours_per_week', type: 'decimal', precision: 5, scale: 2, default: 40 })
  @ApiProperty({ example: 40 })
  work_hours_per_week: number;

  @Column({ name: 'overtime_rate', type: 'decimal', precision: 5, scale: 2, default: 1.15 })
  @ApiProperty({ example: 1.15 })
  overtime_rate: number;

  @Column({ name: 'employee_contribution_rate', type: 'decimal', precision: 5, scale: 2, default: 4.0 })
  @ApiProperty({ example: 4.0 })
  employee_contribution_rate: number;

  @Column({ name: 'employer_contribution_rate', type: 'decimal', precision: 5, scale: 2, default: 17.5 })
  @ApiProperty({ example: 17.5 })
  employer_contribution_rate: number;

  @Column({ name: 'csg_crds_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  @ApiProperty({ example: 0 })
  csg_crds_rate: number;

  @Column({ name: 'annual_leave_days', type: 'decimal', precision: 5, scale: 2, default: 30 })
  @ApiProperty({ example: 30 })
  annual_leave_days: number;

  @Column({ name: 'sick_leave_days', type: 'decimal', precision: 5, scale: 2, default: 15 })
  @ApiProperty({ example: 15 })
  sick_leave_days: number;

  @Column({ name: 'fiscal_year_start_month', type: 'int', default: 1 })
  @ApiProperty({ example: 1 })
  fiscal_year_start_month: number;

  @Column({ name: 'default_monthly_leave_accrual', type: 'decimal', precision: 5, scale: 2, default: 2.5 })
  @ApiProperty({ example: 2.5 })
  default_monthly_leave_accrual: number;

  @Column({ name: 'print_settings', type: 'jsonb', nullable: true })
  @ApiProperty({ required: false })
  print_settings: any;

  @Column({ name: 'is_initialized', default: false })
  @ApiProperty({ example: false })
  is_initialized: boolean;

  @Column({ name: 'default_working_days_per_week', type: 'decimal', precision: 5, scale: 2, default: 5 })
  @ApiProperty({ example: 5 })
  default_working_days_per_week: number;

  @Column({ name: 'default_trial_period_days', type: 'int', default: 0 })
  @ApiProperty({ example: 0 })
  default_trial_period_days: number;

  @Column({ name: 'default_notice_period_days', type: 'int', default: 30 })
  @ApiProperty({ example: 30 })
  default_notice_period_days: number;

  @Column({ name: 'collective_agreement', nullable: true })
  @ApiProperty({ required: false })
  collective_agreement: string;

  @Column({ name: 'classification', nullable: true })
  @ApiProperty({ required: false })
  classification: string;

  @Column({ name: 'coefficient', nullable: true })
  @ApiProperty({ required: false })
  coefficient: string;

  @Column({ name: 'ceo_name', nullable: true })
  @ApiProperty({ required: false })
  ceo_name: string;

  @Column({ name: 'ceo_email', nullable: true })
  @ApiProperty({ required: false })
  ceo_email: string;

  @Column({ name: 'ceo_position', default: 'Directeur Général' })
  @ApiProperty({ required: false })
  ceo_position: string;

  @Column({ name: 'ceo_signature_url', nullable: true })
  @ApiProperty({ required: false })
  ceo_signature_url: string;

  @Column({ name: 'leave_approval_mode', default: 'simple' })
  @ApiProperty({ example: 'simple', description: 'Mode d\'approbation des congés: simple (admin direct) ou workflow (étapes multiples)' })
  leave_approval_mode: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
