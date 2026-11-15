import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AccountingEntryType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

@Entity('accounting_mappings')
export class AccountingMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rubric_name' })
  rubricName: string; // ex: 'Salaire Brut', 'Cotisations Salariales', etc.

  @Column({ name: 'account_number' })
  accountNumber: string; // ex: '641000', '421000'

  @Column({ name: 'account_name', nullable: true })
  accountName: string;

  @Column({
    name: 'entry_type',
    type: 'enum',
    enum: AccountingEntryType,
    default: AccountingEntryType.DEBIT,
  })
  entryType: AccountingEntryType;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
