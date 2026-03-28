import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApprovalWorkflow } from './approval-workflow.entity';

@Entity('approval_requests')
export class ApprovalRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'workflow_id', type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => ApprovalWorkflow)
  @JoinColumn({ name: 'workflow_id' })
  workflow: ApprovalWorkflow;

  @Column()
  module: string;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId: string;

  @Column({ name: 'entity_label', nullable: true })
  entityLabel: string;

  @Column({ name: 'requester_id', type: 'uuid' })
  requesterId: string;

  @Column({ name: 'current_step', type: 'int', default: 1 })
  currentStep: number;

  @Column({ default: 'pending' })
  status: string; // 'pending' | 'approved' | 'rejected' | 'cancelled'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp with time zone', nullable: true })
  completedAt: Date;
}
