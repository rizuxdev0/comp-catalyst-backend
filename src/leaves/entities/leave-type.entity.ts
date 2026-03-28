import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'PAID' })
  code: string;

  @Column()
  @ApiProperty({ example: 'Congé Payé' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @Column({ name: 'default_days', default: 0 })
  @ApiProperty({ example: 25 })
  defaultDays: number;

  @Column({ name: 'is_paid', default: true })
  @ApiProperty({ example: true })
  isPaid: boolean;

  @Column({ name: 'requires_justification', default: false })
  @ApiProperty({ example: false })
  requiresJustification: boolean;

  @Column({ name: 'max_consecutive_days', nullable: true })
  @ApiProperty({ example: 15, required: false })
  maxConsecutiveDays: number;

  @Column({ name: 'is_active', default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  @Column({ nullable: true })
  @ApiProperty({ example: '#ff0000', required: false })
  color: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
