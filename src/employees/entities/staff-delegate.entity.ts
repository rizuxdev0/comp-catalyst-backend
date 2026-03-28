import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('staff_delegates')
export class StaffDelegate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ length: 50 })
  delegate_type: string;

  @Column({ type: 'date' })
  mandate_start_date: string;

  @Column({ type: 'date', nullable: true })
  mandate_end_date: string;

  @Column({ length: 200, nullable: true })
  constituency: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('delegate_settings')
export class DelegateSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  key: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
