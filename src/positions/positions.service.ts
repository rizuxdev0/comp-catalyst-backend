import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async findAll() {
    return this.positionsRepository.find({ order: { title: 'ASC' } });
  }

  async findOne(id: string) {
    const position = await this.positionsRepository.findOneBy({ id });
    if (!position) throw new NotFoundException('Poste non trouvé');
    return position;
  }

  async findByTitle(title: string) {
    return this.positionsRepository.findOneBy({ title });
  }

  async create(data: Partial<Position>) {
    const existing = await this.findByTitle(data.title);
    if (existing) throw new ConflictException('Ce poste existe déjà');
    
    const position = this.positionsRepository.create(data);
    return this.positionsRepository.save(position);
  }

  async update(id: string, data: Partial<Position>) {
    await this.findOne(id);
    await this.positionsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const position = await this.findOne(id);
    return this.positionsRepository.remove(position);
  }
}
