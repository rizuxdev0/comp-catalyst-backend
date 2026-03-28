import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private repo: Repository<Evaluation>,
  ) {}

  findAll(): Promise<Evaluation[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee', 'evaluator'] });
  }

  async findOne(id: string): Promise<Evaluation> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee', 'evaluator'] });
    if (!item) throw new NotFoundException('Évaluation non trouvée');
    return item;
  }

  findByEmployee(employeeId: string): Promise<Evaluation[]> {
    return this.repo.find({
      where: { employee_id: employeeId },
      order: { evaluation_date: 'DESC' },
      relations: ['evaluator'],
    });
  }

  create(data: Partial<Evaluation>): Promise<Evaluation> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<Evaluation>): Promise<Evaluation> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async complete(id: string, rating: number): Promise<Evaluation> {
    await this.repo.update(id, {
      status: 'completed',
      overall_rating: rating,
      evaluation_date: new Date().toISOString().split('T')[0],
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
