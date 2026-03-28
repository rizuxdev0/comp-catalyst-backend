import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('smtp_settings')
export class SmtpSettings {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ default: 'smtp.gmail.com' })
  @ApiProperty({ example: 'smtp.gmail.com' })
  host: string;

  @Column({ type: 'int', default: 587 })
  @ApiProperty({ example: 587 })
  port: number;

  @Column({ default: 'noreply@example.com' })
  @ApiProperty({ example: 'noreply@example.com' })
  user: string;

  @Column({ nullable: true, select: false }) // Hide password by default
  @ApiProperty({ required: false })
  pass: string;

  @Column({ default: true })
  @ApiProperty({ example: true })
  secure: boolean;

  @Column({ name: 'from_name', default: 'Eco HR Solution' })
  @ApiProperty({ example: 'Eco HR Solution' })
  fromName: string;

  @Column({ name: 'from_email', default: 'noreply@example.com' })
  @ApiProperty({ example: 'noreply@example.com' })
  fromEmail: string;

  @Column({ name: 'is_active', default: false })
  @ApiProperty({ example: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
