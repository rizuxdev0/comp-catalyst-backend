import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contract_types')
export class ContractType {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'CDI', description: 'Code unique du type de contrat' })
  code: string;

  @Column()
  @ApiProperty({ example: 'Contrat à Durée Indéterminée' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Contrat standard sans date de fin' })
  description: string;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Si le contrat a une durée indéterminée' })
  isPermanent: boolean;

  @Column({ default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  @Column({ name: 'default_trial_period_days', nullable: true })
  @ApiProperty({ example: 30, required: false })
  defaultTrialPeriodDays: number;

  @Column({ name: 'default_notice_period_days', nullable: true })
  @ApiProperty({ example: 30, required: false })
  defaultNoticePeriodDays: number;

  @Column({ name: 'suggested_worker_category', nullable: true })
  @ApiProperty({ example: 'Cadre', required: false })
  suggestedWorkerCategory: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
