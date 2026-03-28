import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from './leave-type.entity';

export enum LeaveRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('leave_requests')
export class LeaveRequest {
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

  @Column({ name: 'leave_type_id' })
  @ApiProperty({ example: 'uuid' })
  leaveTypeId: string;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  @ApiProperty({ type: () => LeaveType })
  leaveType: LeaveType;

  @Column({ name: 'start_date', type: 'date' })
  @ApiProperty({ example: '2024-05-01' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  @ApiProperty({ example: '2024-05-15' })
  endDate: Date;

  @Column({ name: 'days_count', type: 'decimal', precision: 5, scale: 1 })
  @ApiProperty({ example: 10.5 })
  daysCount: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveRequestStatus,
    default: LeaveRequestStatus.PENDING,
  })
  @ApiProperty({ enum: LeaveRequestStatus })
  status: LeaveRequestStatus;

  @Column({ name: 'approved_by', nullable: true })
  @ApiProperty({ required: false })
  approvedBy: string;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  @ApiProperty({ required: false })
  approvedAt: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  @ApiProperty({ required: false })
  rejectionReason: string;

  @Column({ name: 'document_url', type: 'text', nullable: true })
  @ApiProperty({ required: false })
  documentUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
