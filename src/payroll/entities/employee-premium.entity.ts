import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';
import { PremiumType } from './premium-type.entity';

@Entity('employee_premiums')
export class EmployeePremium {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'premium_type_id' })
  @ApiProperty({ example: 'uuid' })
  premiumTypeId: string;

  @ManyToOne(() => PremiumType)
  @JoinColumn({ name: 'premium_type_id' })
  @ApiProperty({ type: () => PremiumType })
  premiumType: PremiumType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 50000 })
  amount: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  endDate: Date;

  @Column({ name: 'is_active', default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  notes: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
