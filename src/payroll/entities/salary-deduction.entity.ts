import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum DeductionType {
  ADVANCE = 'advance',
  LOAN = 'loan',
  GARNISHMENT = 'garnishment',
  ABSENCE = 'absence',
  EQUIPMENT = 'equipment',
  PENALTY = 'penalty',
  OTHER = 'other',
}

export enum DeductionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('salary_deductions')
export class SalaryDeduction {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({
    type: 'enum',
    enum: DeductionType,
  })
  @ApiProperty({ enum: DeductionType })
  type: DeductionType;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 100000 })
  totalAmount: number;

  @Column({ name: 'amount_per_month', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 25000 })
  amountPerMonth: number;

  @Column({ name: 'remaining_amount', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 75000 })
  remainingAmount: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  endDate: Date;

  @Column({ name: 'installments_count', default: 1 })
  @ApiProperty({ example: 4 })
  installmentsCount: number;

  @Column({ name: 'installments_paid', default: 0 })
  @ApiProperty({ example: 1 })
  installmentsPaid: number;

  @Column({
    type: 'enum',
    enum: DeductionStatus,
    default: DeductionStatus.ACTIVE,
  })
  @ApiProperty({ enum: DeductionStatus })
  status: DeductionStatus;

  @Column({
    name: 'approval_status',
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  @ApiProperty({ enum: ApprovalStatus })
  approvalStatus: ApprovalStatus;

  @Column({ name: 'approved_by', nullable: true })
  @ApiProperty({ required: false })
  approvedBy: string;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  @ApiProperty({ required: false })
  approvedAt: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  @ApiProperty({ required: false })
  rejectionReason: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
