import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Establishment } from '../../establishments/entities/establishment.entity';

export enum EmployeeStatus {
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated',
  RETIRED = 'retired',
}

export enum EmploymentType {
  PERMANENT = 'permanent',
  FIXED_TERM = 'fixed_term',
  INTERN = 'intern',
  CONSULTANT = 'consultant',
  TEMPORARY = 'temporary',
}

export enum WorkMode {
  ON_SITE = 'on_site',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum CivilityType {
  MR = 'mr',
  MRS = 'mrs',
  MS = 'ms',
  DR = 'dr',
  PROF = 'prof',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  SEPARATED = 'separated',
  PACS = 'pacs',
}

export enum SalaryFrequency {
  MONTHLY = 'monthly',
  BIWEEKLY = 'biweekly',
  WEEKLY = 'weekly',
  ANNUAL = 'annual',
}

export enum ShiftType {
  DAY = 'day',
  NIGHT = 'night',
  ROTATING = 'rotating',
  FLEXIBLE = 'flexible',
}

export enum MarriageRegime {
  COMMUNITY = 'community',
  SEPARATION = 'separation',
  PARTICIPATION = 'participation',
  UNIVERSAL_COMMUNITY = 'universal_community',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User, required: false })
  user: User;

  @Column({ name: 'employee_code', unique: true })
  @ApiProperty({ example: 'EMP001' })
  employee_code: string;

  @Column({ name: 'employee_number', nullable: true })
  employee_number: string;

  // ── Personal Info ──
  @Column({ type: 'enum', enum: CivilityType, nullable: true })
  civility: CivilityType;

  @Column({ name: 'first_name' })
  first_name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @Column({ name: 'middle_name', nullable: true })
  middle_name: string;

  @Column({ name: 'preferred_name', nullable: true })
  preferred_name: string;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender: GenderType;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  date_of_birth: string;

  @Column({ name: 'place_of_birth', nullable: true })
  place_of_birth: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ name: 'marital_status', type: 'enum', enum: MaritalStatus, nullable: true })
  marital_status: MaritalStatus;

  @Column({ name: 'spouse_name', nullable: true })
  spouse_name: string;

  @Column({ name: 'marriage_regime', type: 'enum', enum: MarriageRegime, nullable: true })
  marriage_regime: MarriageRegime;

  @Column({ name: 'number_of_dependents', type: 'int', default: 0 })
  number_of_dependents: number;

  // ── Identity Documents ──
  @Column({ name: 'national_id_number', nullable: true })
  national_id_number: string;

  @Column({ name: 'passport_number', nullable: true })
  passport_number: string;

  @Column({ name: 'passport_expiration_date', type: 'date', nullable: true })
  passport_expiration_date: string;

  @Column({ name: 'social_security_number', nullable: true })
  social_security_number: string;

  @Column({ name: 'tax_number', nullable: true })
  tax_number: string;

  // ── Contact ──
  @Column({ name: 'personal_email', nullable: true })
  personal_email: string;

  @Column({ name: 'work_email', nullable: true })
  work_email: string;

  @Column({ name: 'personal_phone', nullable: true })
  personal_phone: string;

  @Column({ name: 'work_phone', nullable: true })
  work_phone: string;

  @Column({ name: 'address_line1', nullable: true })
  address_line1: string;

  @Column({ name: 'address_line2', nullable: true })
  address_line2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: 'state_or_province', nullable: true })
  state_or_province: string;

  @Column({ name: 'postal_code', nullable: true })
  postal_code: string;

  @Column({ name: 'country_code', nullable: true })
  country_code: string;

  // ── Employment ──
  @Column({ name: 'job_title' })
  job_title: string;

  @Column({ name: 'job_level', nullable: true })
  job_level: string;

  @Column({ name: 'department_id', nullable: true })
  department_id: string;

  @ManyToOne(() => Department, (dept) => dept.employees, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'establishment_id', nullable: true })
  establishment_id: string;

  @ManyToOne(() => Establishment, (est) => est.employees, { nullable: true })
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @Column({
    name: 'employee_status',
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  employee_status: EmployeeStatus;

  @Column({
    name: 'employment_type',
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.PERMANENT,
  })
  employment_type: EmploymentType;

  @Column({ name: 'employment_start_date', type: 'date' })
  employment_start_date: string;

  @Column({ name: 'employment_end_date', type: 'date', nullable: true })
  employment_end_date: string;

  @Column({ name: 'work_location', nullable: true })
  work_location: string;

  @Column({ name: 'work_mode', type: 'enum', enum: WorkMode, nullable: true })
  work_mode: WorkMode;

  @Column({ name: 'manager_employee_code', nullable: true })
  manager_employee_code: string;

  @Column({ name: 'probation_start_date', type: 'date', nullable: true })
  probation_start_date: string;

  @Column({ name: 'probation_end_date', type: 'date', nullable: true })
  probation_end_date: string;

  @Column({ name: 'working_hours_per_week', type: 'decimal', precision: 5, scale: 2, nullable: true })
  working_hours_per_week: number;

  @Column({ name: 'working_days_per_week', type: 'int', nullable: true })
  working_days_per_week: number;

  @Column({ name: 'shift_type', type: 'enum', enum: ShiftType, nullable: true })
  shift_type: ShiftType;

  @Column({ name: 'overtime_eligible', type: 'boolean', default: true })
  overtime_eligible: boolean;

  @Column({ name: 'worker_category', nullable: true })
  worker_category: string;

  @Column({ name: 'preferred_payment_method', nullable: true })
  preferred_payment_method: string;

  @Column({ name: 'mobile_money_number', nullable: true })
  mobile_money_number: string;

  @Column({ name: 'mobile_money_provider', nullable: true })
  mobile_money_provider: string;

  // ── Compensation ──
  @Column({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 })
  base_salary: number;

  @Column({ name: 'salary_frequency', type: 'enum', enum: SalaryFrequency, nullable: true })
  salary_frequency: SalaryFrequency;

  @Column({ name: 'salary_currency', nullable: true })
  salary_currency: string;

  @Column({ name: 'salary_effective_date', type: 'date', nullable: true })
  salary_effective_date: string;

  @Column({ name: 'bonus_eligible', type: 'boolean', default: true })
  bonus_eligible: boolean;

  @Column({ name: 'benefits_eligible', type: 'boolean', default: true })
  benefits_eligible: boolean;

  // ── Benefits ──
  @Column({ name: 'health_insurance_provider', nullable: true })
  health_insurance_provider: string;

  @Column({ name: 'pension_plan', nullable: true })
  pension_plan: string;

  @Column({ name: 'insurance_policy_number', nullable: true })
  insurance_policy_number: string;

  @Column({ name: 'benefit_start_date', type: 'date', nullable: true })
  benefit_start_date: string;

  // ── Bank ──
  @Column({ name: 'bank_id', nullable: true })
  bank_id: string;

  @Column({ name: 'bank_account_number', nullable: true })
  bank_account_number: string;

  @Column({ name: 'bank_iban', nullable: true })
  bank_iban: string;

  @Column({ name: 'bank_bic', nullable: true })
  bank_bic: string;

  // ── Career ──
  @Column({ name: 'hire_source', nullable: true })
  hire_source: string;

  @Column({ name: 'performance_rating', type: 'decimal', precision: 3, scale: 1, nullable: true })
  performance_rating: number;

  @Column({ name: 'career_level', nullable: true })
  career_level: string;

  @Column({ name: 'succession_eligible', type: 'boolean', default: false })
  succession_eligible: boolean;

  // ── Education ──
  @Column({ name: 'education_level', nullable: true })
  education_level: string;

  @Column({ nullable: true })
  diploma: string;

  @Column({ name: 'diploma_year', type: 'int', nullable: true })
  diploma_year: number;

  @Column({ name: 'education_institution', nullable: true })
  education_institution: string;

  // ── Health ──
  @Column({ name: 'disability_status', nullable: true })
  disability_status: string;

  @Column({ name: 'medical_restrictions', type: 'text', nullable: true })
  medical_restrictions: string;

  @Column({ name: 'last_medical_check_date', type: 'date', nullable: true })
  last_medical_check_date: string;

  // ── Emergency Contact ──
  @Column({ name: 'emergency_contact_name', nullable: true })
  emergency_contact_name: string;

  @Column({ name: 'emergency_contact_phone', nullable: true })
  emergency_contact_phone: string;

  @Column({ name: 'emergency_contact_relationship', nullable: true })
  emergency_contact_relationship: string;

  // ── Avatar ──
  @Column({ name: 'avatar_url', nullable: true })
  avatar_url: string;

  // ── Timestamps ──
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;

  @BeforeInsert()
  generateEmployeeCode() {
    if (!this.employee_code) {
      this.employee_code = 'EMP' + Date.now().toString().slice(-7);
    }
  }
}
