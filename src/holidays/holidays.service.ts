import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from './entities/holiday.entity';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
  ) {}

  async findAll(): Promise<Holiday[]> {
    return this.holidayRepository.find({ order: { date: 'ASC' } });
  }

  async findByYear(year: number): Promise<Holiday[]> {
    return this.holidayRepository.createQueryBuilder('holiday')
      .where('EXTRACT(YEAR FROM holiday.date) = :year', { year })
      .orderBy('holiday.date', 'ASC')
      .getMany();
  }

  async create(data: Partial<Holiday>): Promise<Holiday> {
    const holiday = this.holidayRepository.create(data);
    return this.holidayRepository.save(holiday);
  }

  async update(id: string, data: Partial<Holiday>): Promise<Holiday> {
    await this.holidayRepository.update(id, data);
    return this.holidayRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.holidayRepository.delete(id);
  }
}
