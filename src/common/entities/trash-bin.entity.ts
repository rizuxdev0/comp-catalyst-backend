import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('trash_bin')
export class TrashBinItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  entity_type: string;

  @Column({ type: 'uuid' })
  entity_id: string;

  @Column({ type: 'jsonb' })
  entity_data: any;

  @Column({ type: 'uuid', nullable: true })
  deleted_by: string;

  @CreateDateColumn()
  deleted_at: Date;

  @Column({ default: false })
  permanently_deleted: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  restore_deadline: Date;
}
