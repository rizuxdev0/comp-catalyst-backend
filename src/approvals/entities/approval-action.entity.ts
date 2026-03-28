import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApprovalRequest } from './approval-request.entity';

@Entity('approval_actions')
export class ApprovalAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'request_id', type: 'uuid' })
  requestId: string;

  @ManyToOne(() => ApprovalRequest)
  @JoinColumn({ name: 'request_id' })
  request: ApprovalRequest;

  @Column({ name: 'step_order', type: 'int' })
  stepOrder: number;

  @Column()
  action: string; // 'approved' | 'rejected' | 'requested' | 'cancelled'

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'acted_by', type: 'uuid' })
  actedBy: string;

  @CreateDateColumn({ name: 'acted_at' })
  actedAt: Date;
}
