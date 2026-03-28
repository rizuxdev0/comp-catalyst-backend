import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerHistory } from './entities/career-history.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(CareerHistory)
    private repo: Repository<CareerHistory>,
    private auditService: AuditService,
  ) {}

  findByEmployee(employeeId: string): Promise<CareerHistory[]> {
    return this.repo.find({
      where: { employee_id: employeeId },
      order: { effective_date: 'DESC' },
    });
  }

  findAll(): Promise<CareerHistory[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<CareerHistory> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Historique carrière non trouvé');
    return item;
  }

  async create(data: Partial<CareerHistory>): Promise<CareerHistory> {
    const item = await this.repo.save(this.repo.create(data));
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'create',
      entityType: 'career',
      entityId: item.id,
      entityName: `${data.event_type || 'Action'} - ${data.new_job_title || ''}`,
      newValues: data,
    });

    return item;
  }

  async update(id: string, data: Partial<CareerHistory>): Promise<CareerHistory> {
    const old = await this.findOne(id);
    await this.repo.update(id, data);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'update',
      entityType: 'career',
      entityId: id,
      entityName: `Carrière ${old.employee_id || id}`,
      oldValues: old,
      newValues: data,
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const old = await this.findOne(id);
    await this.repo.delete(id);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'delete',
      entityType: 'career',
      entityId: id,
      entityName: `Carrière ${old.employee_id || id}`,
    });
  }
}
