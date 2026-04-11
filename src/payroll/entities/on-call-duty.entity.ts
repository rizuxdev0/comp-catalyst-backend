import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum OnCallType {
  NIGHT = 'night',
  WEEKEND = 'weekend',
  HOLIDAY = 'holiday',
  GENERAL = 'general',
}

@Entity('on_call_duties')
export class OnCallDuty {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2024-05-01' })
  date: string;

  @Column({
    type: 'enum',
    enum: OnCallType,
    default: OnCallType.GENERAL,
  })
  @ApiProperty({ enum: OnCallType })
  type: OnCallType;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @ApiProperty({ example: 8 })
  hours: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  @ApiProperty({ example: 5000, description: 'Calculated compensation amount' })
  amount: number;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Whether this has been included in a payslip' })
  isPaid: boolean;

  @Column({ name: 'payslip_id', nullable: true })
  @ApiProperty({ required: false })
  payslipId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
