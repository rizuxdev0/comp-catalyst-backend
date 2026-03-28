import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ name: 'registration_number', unique: true })
  registrationNumber: string;

  @Column({ name: 'chassis_number', nullable: true })
  chassisNumber: string;

  @Column({ nullable: true })
  type: string; // 'sedan' | 'suv' | 'truck' | 'van'

  @Column({ nullable: true })
  color: string;

  @Column({ name: 'manufacture_year', nullable: true })
  manufactureYear: number;

  @Column({ default: 'available' })
  status: string; // 'available' | 'assigned' | 'maintenance' | 'out_of_service'

  @Column({ name: 'current_employee_id', type: 'uuid', nullable: true })
  currentEmployeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'current_employee_id' })
  currentEmployee: Employee;

  @Column({ name: 'assignment_date', type: 'date', nullable: true })
  assignmentDate: Date;

  @Column({ name: 'insurance_expiry', type: 'date', nullable: true })
  insuranceExpiry: Date;

  @Column({ name: 'last_maintenance', type: 'date', nullable: true })
  lastMaintenance: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
