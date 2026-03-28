import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';
import { ContractType } from './contract-type.entity';

export enum ContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated',
  EXPIRED = 'expired',
}

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  id: string;

  @Column({ name: 'contract_number', unique: true })
  @ApiProperty({ example: 'CONT-2024-001' })
  contractNumber: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'contract_type_id' })
  @ApiProperty({ example: 'uuid' })
  contractTypeId: string;

  @ManyToOne(() => ContractType)
  @JoinColumn({ name: 'contract_type_id' })
  contractType: ContractType;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.DRAFT,
  })
  @ApiProperty({ enum: ContractStatus })
  status: ContractStatus;

  @Column({ name: 'job_title' })
  @ApiProperty({ example: 'Senior Developer' })
  jobTitle: string;

  @Column({ name: 'start_date', type: 'date' })
  @ApiProperty({ example: '2024-01-01' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  @ApiProperty({ example: '2024-12-31', required: false })
  endDate: Date;

  @Column({ name: 'base_salary', type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 500000 })
  baseSalary: number;

  @Column({ name: 'working_hours_per_week', type: 'decimal', precision: 5, scale: 2, nullable: true })
  @ApiProperty({ example: 40 })
  workingHoursPerWeek: number;

  @Column({ name: 'is_renewable', default: false })
  @ApiProperty({ example: false })
  isRenewable: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
