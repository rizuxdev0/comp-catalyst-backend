import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from './leave-type.entity';

@Entity('leave_balances')
@Unique(['employeeId', 'leaveTypeId', 'year'])
export class LeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'leave_type_id' })
  @ApiProperty({ example: 'uuid' })
  leaveTypeId: string;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;

  @Column()
  @ApiProperty({ example: 2024 })
  year: number;

  @Column({ name: 'entitled_days', type: 'decimal', precision: 5, scale: 1, default: 0 })
  @ApiProperty({ example: 25 })
  entitledDays: number;

  @Column({ name: 'taken_days', type: 'decimal', precision: 5, scale: 1, default: 0 })
  @ApiProperty({ example: 5 })
  takenDays: number;

  @Column({ name: 'pending_days', type: 'decimal', precision: 5, scale: 1, default: 0 })
  @ApiProperty({ example: 2 })
  pendingDays: number;

  @Column({ name: 'carried_over_days', type: 'decimal', precision: 5, scale: 1, default: 0 })
  @ApiProperty({ example: 5 })
  carriedOverDays: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
