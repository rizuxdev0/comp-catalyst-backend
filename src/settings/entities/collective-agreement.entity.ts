import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('collective_agreements')
export class CollectiveAgreement {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ length: 255 })
  @ApiProperty({ example: 'Convention Collective Interprofessionnelle du Togo' })
  name: string;

  @Column({ length: 50, unique: true })
  @ApiProperty({ example: 'CCIT-TG' })
  code: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Description de la convention' })
  description: string;

  @Column({ length: 100, default: 'Togo' })
  @ApiProperty({ example: 'Togo' })
  country: string;

  @Column({ name: 'effective_date', type: 'date', nullable: true })
  @ApiProperty({ example: '2024-01-01' })
  effective_date: string;

  @Column({ name: 'expiry_date', type: 'date', nullable: true })
  @ApiProperty({ example: '2026-12-31' })
  expiry_date: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ example: { smig: 52500, base_value: 525 } })
  salary_grid: any;

  @Column({ type: 'jsonb', name: 'classification_levels', nullable: true })
  @ApiProperty({ example: [] })
  classification_levels: any;

  @Column({ name: 'working_hours_per_week', type: 'int', default: 40 })
  @ApiProperty({ example: 40 })
  working_hours_per_week: number;

  @Column({ type: 'jsonb', name: 'overtime_rules', nullable: true })
  @ApiProperty({ example: { rate_25: 1.25, rate_50: 1.5, rate_100: 2 } })
  overtime_rules: any;

  @Column({ type: 'jsonb', name: 'leave_rules', nullable: true })
  @ApiProperty({ example: { annual: 30, maternity: 14, paternity: 3 } })
  leave_rules: any;

  @Column({ name: 'is_active', default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
