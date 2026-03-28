import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApprovalWorkflow } from './approval-workflow.entity';

@Entity('approval_steps')
export class ApprovalStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'workflow_id', type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => ApprovalWorkflow, (workflow) => workflow.steps)
  @JoinColumn({ name: 'workflow_id' })
  workflow: ApprovalWorkflow;

  @Column({ name: 'step_order', type: 'int' })
  stepOrder: number;

  @Column({ name: 'approver_type' })
  approverType: string; // 'role' | 'user' | 'manager' | 'department_head'

  @Column({ name: 'approver_role', nullable: true })
  approverRole: string;

  @Column({ name: 'approver_user_id', type: 'uuid', nullable: true })
  approverUserId: string;

  @Column({ name: 'is_required', default: true })
  isRequired: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
