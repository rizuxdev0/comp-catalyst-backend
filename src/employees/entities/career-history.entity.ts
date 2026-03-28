import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum CareerChangeType {
  PROMOTION = 'promotion',
  TRANSFER = 'transfer',
  DEMOTION = 'demotion',
  SALARY_INCREASE = 'salary_increase',
  INITIAL_ASSIGNMENT = 'initial_assignment',
  OTHER = 'other',
}

@Entity('career_histories')
export class CareerHistory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column({ name: 'employee_id' })
  @ApiProperty({ example: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'change_date', type: 'date' })
  @ApiProperty({ example: '2024-01-01' })
  changeDate: Date;

  @Column({
    type: 'enum',
    enum: CareerChangeType,
  })
  @ApiProperty({ enum: CareerChangeType })
  type: CareerChangeType;

  @Column({ name: 'old_position', nullable: true })
  @ApiProperty({ example: 'Junior Developer', required: false })
  oldPosition: string;

  @Column({ name: 'new_position', nullable: true })
  @ApiProperty({ example: 'Senior Developer', required: false })
  newPosition: string;

  @Column({ name: 'old_department', nullable: true })
  @ApiProperty({ example: 'IT', required: false })
  oldDepartment: string;

  @Column({ name: 'new_department', nullable: true })
  @ApiProperty({ example: 'R&D', required: false })
  newDepartment: string;

  @Column({ name: 'old_salary', type: 'decimal', precision: 15, scale: 2, nullable: true })
  @ApiProperty({ example: 500000, required: false })
  oldSalary: number;

  @Column({ name: 'new_salary', type: 'decimal', precision: 15, scale: 2, nullable: true })
  @ApiProperty({ example: 700000, required: false })
  newSalary: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Excellent performance review', required: false })
  notes: string;

  @Column({ name: 'document_url', nullable: true })
  @ApiProperty({ required: false })
  documentUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
