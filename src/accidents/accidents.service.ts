import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkAccident } from './entities/work-accident.entity';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(WorkAccident)
    private repo: Repository<WorkAccident>,
  ) {}

  findAll(): Promise<WorkAccident[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<WorkAccident> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Accident de travail non trouvé');
    return item;
  }

  findByEmployee(employeeId: string): Promise<WorkAccident[]> {
    return this.repo.find({
      where: { employee_id: employeeId },
      order: { accident_date: 'DESC' },
    });
  }

  create(data: Partial<WorkAccident>): Promise<WorkAccident> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: string, data: Partial<WorkAccident>): Promise<WorkAccident> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
