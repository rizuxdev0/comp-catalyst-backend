import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

export enum PasswordStatus {
  ACTIVE = 'active',
  MUST_CHANGE = 'must_change',
  TEMPORARY = 'temporary',
  EXPIRED = 'expired',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'must_change_password', default: false })
  mustChangePassword: boolean;

  @Column({
    type: 'enum',
    enum: PasswordStatus,
    default: PasswordStatus.ACTIVE,
    name: 'password_status',
  })
  passwordStatus: PasswordStatus;

  @Column({ name: 'temporary_password_expires_at', type: 'timestamptz', nullable: true })
  temporaryPasswordExpiresAt: Date;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'extra_permissions', type: 'text', array: true, default: [] })
  extraPermissions: string[];

  @Column({ name: 'reset_password_token', nullable: true, select: false })
  resetPasswordToken: string;

  @Column({ name: 'reset_password_expires_at', type: 'timestamptz', nullable: true, select: false })
  resetPasswordExpiresAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];
}
