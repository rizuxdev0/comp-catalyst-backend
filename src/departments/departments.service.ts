import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private auditService: AuditService,
  ) {}

  async create(createDepartmentDto: Partial<Department>): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    const saved = await this.departmentRepository.save(department);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'create',
      entityType: 'department',
      entityId: saved.id,
      entityName: saved.name || saved.id,
      newValues: createDepartmentDto,
    });
    
    return saved;
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.manager', 'manager')
      .leftJoinAndSelect('department.parent', 'parent')
      .loadRelationCountAndMap('department.employeeCount', 'department.employees')
      .getMany();
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['manager', 'parent', 'children', 'employees'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateData: Partial<Department>): Promise<Department> {
    const old = await this.findOne(id);
    await this.departmentRepository.update(id, updateData);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'update',
      entityType: 'department',
      entityId: id,
      entityName: old.name || id,
      oldValues: old,
      newValues: updateData,
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const old = await this.findOne(id);
    await this.departmentRepository.delete(id);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'delete',
      entityType: 'department',
      entityId: id,
      entityName: old.name || id,
    });
  }
}
