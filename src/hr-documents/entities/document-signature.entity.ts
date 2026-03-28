import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HRDocument } from '../../employees/entities/hr-document.entity';

@Entity('document_signatures')
export class DocumentSignature {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'document_id' })
  @ApiProperty({ example: 'uuid' })
  documentId: string;

  @ManyToOne(() => HRDocument)
  @JoinColumn({ name: 'document_id' })
  document: HRDocument;

  @Column({ name: 'signer_id' })
  @ApiProperty({ example: 'uuid' })
  signerId: string;

  @Column({ name: 'signer_name' })
  @ApiProperty({ example: 'Jean Dupont' })
  signerName: string;

  @Column({ name: 'signer_email', nullable: true })
  @ApiProperty({ example: 'jean.dupont@example.com', required: false })
  signerEmail: string;

  @Column({ name: 'signature_type' })
  @ApiProperty({ example: 'drawn' })
  signatureType: string;

  @Column({ name: 'signature_image_url', nullable: true })
  @ApiProperty({ required: false })
  signatureImageUrl: string;

  @Column({ name: 'ip_address', nullable: true })
  @ApiProperty({ required: false })
  ipAddress: string;

  @Column({ name: 'user_agent', nullable: true })
  @ApiProperty({ required: false })
  userAgent: string;

  @Column({ name: 'validation_code', nullable: true })
  @ApiProperty({ required: false })
  validationCode: string;

  @Column({ name: 'is_valid', default: true })
  @ApiProperty({ example: true })
  isValid: boolean;

  @Column({ name: 'signed_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  signedAt: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  @ApiProperty({ required: false })
  revokedAt: Date;

  @Column({ name: 'revoked_reason', type: 'text', nullable: true })
  @ApiProperty({ required: false })
  revokedReason: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ required: false })
  metadata: any;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
