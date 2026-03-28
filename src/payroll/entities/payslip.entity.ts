import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum PaySlipStatus {
  DRAFT = 'draft',
  VALIDATED = 'validated',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity('payslips')
export class PaySlip {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  @ApiProperty({ type: () => Employee })
  employee: Employee;

  @Column({ name: 'period_month' })
  @ApiProperty({ example: 5 })
  periodMonth: number;

  @Column({ name: 'period_year' })
  @ApiProperty({ example: 2024 })
  periodYear: number;

  @Column({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 500000 })
  baseSalary: number;

  @Column({ name: 'gross_salary', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 600000 })
  grossSalary: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 450000 })
  netSalary: number;

  @Column({ name: 'total_premiums', type: 'decimal', precision: 15, scale: 2, default: 0 })
  @ApiProperty({ example: 100000 })
  totalPremiums: number;

  @Column({ name: 'total_deductions', type: 'decimal', precision: 15, scale: 2, default: 0 })
  @ApiProperty({ example: 50000 })
  totalDeductions: number;

  @Column({ type: 'jsonb', name: 'premiums_detail', default: [] })
  @ApiProperty({ example: [{ label: 'Bonus', amount: 100000 }] })
  premiumsDetail: any[];

  @Column({ type: 'jsonb', name: 'deductions_detail', default: [] })
  @ApiProperty({ example: [{ label: 'Social Sec', amount: 50000 }] })
  deductionsDetail: any[];

  @Column({ type: 'jsonb', name: 'employer_detail', default: [] })
  @ApiProperty({ example: [{ label: 'Employer Social', amount: 80000 }] })
  employerDetail: any[];

  @Column({
    type: 'enum',
    enum: PaySlipStatus,
    default: PaySlipStatus.DRAFT,
  })
  @ApiProperty({ enum: PaySlipStatus })
  status: PaySlipStatus;

  @Column({ name: 'validated_by', nullable: true })
  @ApiProperty({ required: false })
  validatedBy: string;

  @Column({ name: 'validated_at', type: 'timestamptz', nullable: true })
  @ApiProperty({ required: false })
  validatedAt: Date;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  @ApiProperty({ required: false })
  paidAt: Date;

  @Column({ name: 'document_url', nullable: true })
  @ApiProperty({ required: false })
  documentUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
