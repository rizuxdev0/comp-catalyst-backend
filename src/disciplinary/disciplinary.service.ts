import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplinaryAction } from './entities/disciplinary-action.entity';

@Injectable()
export class DisciplinaryService {
  constructor(
    @InjectRepository(DisciplinaryAction)
    private repo: Repository<DisciplinaryAction>,
  ) {}

  findAll(): Promise<DisciplinaryAction[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<DisciplinaryAction> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Action disciplinaire non trouvée');
    return item;
  }

  findByEmployee(employeeId: string): Promise<DisciplinaryAction[]> {
    return this.repo.find({
      where: { employee_id: employeeId },
      order: { created_at: 'DESC' },
    });
  }

  create(data: Partial<DisciplinaryAction>): Promise<DisciplinaryAction> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: string, data: Partial<DisciplinaryAction>): Promise<DisciplinaryAction> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
