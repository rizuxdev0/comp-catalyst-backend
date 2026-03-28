import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departure } from './entities/departure.entity';

@Injectable()
export class DeparturesService {
  constructor(
    @InjectRepository(Departure)
    private repo: Repository<Departure>,
  ) {}

  findAll(): Promise<Departure[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<Departure> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Départ non trouvé');
    return item;
  }

  create(data: Partial<Departure>): Promise<Departure> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<Departure>): Promise<Departure> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async complete(id: string): Promise<Departure> {
    await this.repo.update(id, { status: 'completed' });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
