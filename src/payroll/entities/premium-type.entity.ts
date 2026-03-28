import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('premium_types')
export class PremiumType {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'PRIME_TRANSPORT' })
  code: string;

  @Column()
  @ApiProperty({ example: 'Prime de transport' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @Column({ name: 'is_taxable', default: true })
  @ApiProperty({ example: true })
  isTaxable: boolean;

  @Column({ name: 'is_recurring', default: false })
  @ApiProperty({ example: true })
  isRecurring: boolean;

  @Column({ name: 'default_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  @ApiProperty({ example: 25000, required: false })
  defaultAmount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
