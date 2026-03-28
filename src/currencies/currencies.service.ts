import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  findAll(): Promise<Currency[]> {
    return this.currenciesRepository.find({ order: { code: 'ASC' } });
  }

  async findOne(id: string): Promise<Currency> {
    const currency = await this.currenciesRepository.findOneBy({ id });
    if (!currency) throw new NotFoundException('Currency not found');
    return currency;
  }

  async create(data: Partial<Currency>): Promise<Currency> {
    const currency = this.currenciesRepository.create(data);
    return this.currenciesRepository.save(currency);
  }

  async update(id: string, data: Partial<Currency>): Promise<Currency> {
    await this.findOne(id);
    await this.currenciesRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.currenciesRepository.delete(id);
  }

  async setDefault(id: string): Promise<Currency> {
    await this.currenciesRepository.update({}, { isDefault: false });
    await this.currenciesRepository.update(id, { isDefault: true });
    return this.findOne(id);
  }
}
