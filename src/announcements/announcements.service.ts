import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private repo: Repository<Announcement>,
  ) {}

  async findAll(activeOnly = true) {
    const query = this.repo.createQueryBuilder('a')
      .leftJoinAndSelect('a.author', 'author')
      .orderBy('a.isUrgent', 'DESC')
      .addOrderBy('a.createdAt', 'DESC');

    if (activeOnly) {
      query.where('a.isActive = :isActive', { isActive: true })
           .andWhere('(a.expiresAt IS NULL OR a.expiresAt > :now)', { now: new Date() });
    }

    return query.getMany();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['author'] });
  }

  async create(data: Partial<Announcement>, author: User) {
    const ann = this.repo.create({ ...data, author });
    return this.repo.save(ann);
  }

  async update(id: string, data: Partial<Announcement>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
