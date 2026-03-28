import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'user_id', nullable: true })
  @ApiProperty({ example: 'uuid', required: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @ApiProperty({ example: 'UPDATE_SALARY' })
  action: string;

  @Column({ name: 'entity_type' })
  @ApiProperty({ example: 'Employee' })
  entityType: string;

  @Column({ name: 'entity_id', nullable: true })
  @ApiProperty({ example: 'uuid', required: false })
  entityId: string;

  @Column({ name: 'entity_name', nullable: true })
  @ApiProperty({ example: 'Jean Dupont', required: false })
  entityName: string;

  @Column({ type: 'jsonb', name: 'old_values', nullable: true })
  @ApiProperty({ required: false })
  oldValues: any;

  @Column({ type: 'jsonb', name: 'new_values', nullable: true })
  @ApiProperty({ required: false })
  newValues: any;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ required: false })
  metadata: any;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
