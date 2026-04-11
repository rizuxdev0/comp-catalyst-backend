import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('performance_bonuses')
export class PerformanceBonus {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  @ApiProperty({ example: 'Q1 Performance' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  criteria: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  @ApiProperty({ example: 95, description: 'Achievement percentage' })
  achievementPercentage: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 50000, description: 'Base bonus amount for 100% achievement' })
  baseAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 47500, description: 'Calculated final amount' })
  finalAmount: number;

  @Column()
  @ApiProperty({ example: '2024-Q1' })
  period: string;

  @Column({ default: false })
  @ApiProperty({ example: false })
  isPaid: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
