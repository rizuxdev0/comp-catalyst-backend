import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AccountingEntryType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

@Entity('accounting_mappings')
export class AccountingMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rubricName: string; // ex: 'Salaire Brut', 'Cotisations Salariales', etc.

  @Column()
  accountNumber: string; // ex: '641000', '421000'

  @Column({ nullable: true })
  accountName: string;

  @Column({
    type: 'enum',
    enum: AccountingEntryType,
    default: AccountingEntryType.DEBIT,
  })
  entryType: AccountingEntryType;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
