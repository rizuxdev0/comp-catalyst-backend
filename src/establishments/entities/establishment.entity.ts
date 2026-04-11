import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanySettings } from '../../settings/entities/company-settings.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('establishments')
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Siège Social' })
  name: string;

  @Column({ name: 'code_ape', nullable: true })
  @ApiProperty({ example: '7010Z' })
  code_ape: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Tertiaire' })
  sector: string;

  @Column({ name: 'registration_number', nullable: true })
  @ApiProperty({ description: 'Numéro d\'enregistrement spécifique à l\'établissement (ex: SIRET)' })
  registration_number: string;

  @Column({ name: 'tax_id', nullable: true })
  @ApiProperty()
  tax_id: string;

  @Column({ name: 'address_line1', nullable: true })
  @ApiProperty()
  address_line1: string;

  @Column({ nullable: true })
  @ApiProperty()
  city: string;

  @Column({ name: 'postal_code', nullable: true })
  @ApiProperty()
  postal_code: string;

  @Column({ name: 'is_main', default: false })
  @ApiProperty({ description: 'Indique s\'il s\'agit de l\'établissement principal' })
  is_main: boolean;

  @Column({ name: 'company_id' })
  company_id: string;

  @ManyToOne(() => CompanySettings)
  @JoinColumn({ name: 'company_id' })
  company: CompanySettings;

  @OneToMany(() => Employee, (employee) => employee.establishment)
  employees: Employee[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
