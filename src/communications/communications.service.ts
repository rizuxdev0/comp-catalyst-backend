import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communication } from './entities/communication.entity';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private repo: Repository<Communication>,
  ) {}

  findAll(): Promise<Communication[]> {
    return this.repo.find({
      order: { created_at: 'DESC' },
      relations: ['recipient_employee', 'recipient_department'],
    });
  }

  async findOne(id: string): Promise<Communication> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['recipient_employee', 'recipient_department'],
    });
    if (!item) throw new NotFoundException('Communication non trouvée');
    return item;
  }

  create(data: Partial<Communication>): Promise<Communication> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: string, data: Partial<Communication>): Promise<Communication> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async publish(id: string): Promise<Communication> {
    await this.repo.update(id, {
      status: 'published',
      published_at: new Date(),
    });
    return this.findOne(id);
  }

  findByStatus(status: string): Promise<Communication[]> {
    return this.repo.find({ where: { status }, order: { created_at: 'DESC' } });
  }
}
