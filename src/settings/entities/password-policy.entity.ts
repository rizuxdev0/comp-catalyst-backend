import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('password_policy')
export class PasswordPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 8 })
  min_length: number;

  @Column({ default: true })
  require_uppercase: boolean;

  @Column({ default: true })
  require_lowercase: boolean;

  @Column({ default: true })
  require_digit: boolean;

  @Column({ default: true })
  require_special_char: boolean;

  @Column({ type: 'int', default: 48 })
  temp_password_expiry_hours: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
