import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Communication } from './communication.entity';

@Entity('communication_deliveries')
export class CommunicationDelivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'communication_id' })
  communication_id: string;

  @ManyToOne(() => Communication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'communication_id' })
  communication: Communication;

  @Column({ name: 'employee_id' })
  employee_id: string;

  @Column({ name: 'email_address' })
  email_address: string;

  @Column({ name: 'email_type' })
  email_type: string;

  @Column({ default: 'pending' })
  status: string; // pending, sent, delivered, failed, no_email

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sent_at: Date;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  delivered_at: Date;

  @Column({ name: 'error_message', nullable: true })
  error_message: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
}
