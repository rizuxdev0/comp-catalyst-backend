import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum CertificateRequestStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  DELIVERED = 'delivered',
  REJECTED = 'rejected',
}

@Entity('certificate_requests')
export class CertificateRequest {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty()
  employeeId: string;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  @ApiProperty({ example: 'work_certificate', description: 'Type of certificate requested' })
  type: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  reason: string;

  @Column({
    type: 'enum',
    enum: CertificateRequestStatus,
    default: CertificateRequestStatus.PENDING,
  })
  @ApiProperty({ enum: CertificateRequestStatus })
  status: CertificateRequestStatus;

  @Column({ name: 'processed_by', nullable: true })
  processedBy: string;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason: string;

  @Column({ name: 'document_url', nullable: true })
  documentUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
