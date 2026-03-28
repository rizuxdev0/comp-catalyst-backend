import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum HRDocumentType {
  CONTRACT = 'contract',
  PAYSLIP = 'payslip',
  CERTIFICATE = 'certificate',
  ID_PROOF = 'id_proof',
  RESUME = 'resume',
  DIPLOMA = 'diploma',
  OTHER = 'other',
}

export enum HRDocumentStatus {
  DRAFT = 'draft',
  SIGNED = 'signed',
  EXPIRED = 'expired',
  VALID = 'valid',
}

@Entity('hr_documents')
export class HRDocument {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  @ApiProperty({ example: 'Contrat de travail - Jean Dupont' })
  title: string;

  @Column({
    type: 'enum',
    enum: HRDocumentType,
  })
  @ApiProperty({ enum: HRDocumentType })
  type: HRDocumentType;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Contrats', required: false })
  category: string;

  @Column({ name: 'document_url' })
  @ApiProperty({ example: 'https://storage.example.com/docs/uuid.pdf' })
  documentUrl: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @Column({ name: 'file_name', nullable: true })
  fileName: string;

  @Column({ name: 'file_size', nullable: true })
  fileSize: number;

  @Column({ name: 'is_confidential', default: false })
  isConfidential: boolean;

  @Column({ name: 'is_signed', default: false })
  isSigned: boolean;

  @Column({ name: 'signed_at', type: 'timestamptz', nullable: true })
  signedAt: Date;

  @Column({ name: 'signed_by', nullable: true })
  signedBy: string;

  @Column({
    type: 'enum',
    enum: HRDocumentStatus,
    default: HRDocumentStatus.VALID,
  })
  @ApiProperty({ enum: HRDocumentStatus })
  status: HRDocumentStatus;

  @Column({ name: 'expiry_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  expiryDate: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  notes: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
