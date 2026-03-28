import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeBenefit } from './entities/employee-benefit.entity';

@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(EmployeeBenefit)
    private repo: Repository<EmployeeBenefit>,
  ) {}

  findAll(): Promise<EmployeeBenefit[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  findByEmployee(employeeId: string): Promise<EmployeeBenefit[]> {
    return this.repo.find({ where: { employee_id: employeeId, is_active: true } });
  }

  async findOne(id: string): Promise<EmployeeBenefit> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Avantage non trouvé');
    return item;
  }

  create(data: Partial<EmployeeBenefit>): Promise<EmployeeBenefit> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<EmployeeBenefit>): Promise<EmployeeBenefit> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
