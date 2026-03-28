import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private banksRepository: Repository<Bank>,
  ) {}

  findAll(): Promise<Bank[]> {
    return this.banksRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Bank> {
    const bank = await this.banksRepository.findOneBy({ id });
    if (!bank) throw new NotFoundException('Bank not found');
    return bank;
  }

  async create(data: Partial<Bank>): Promise<Bank> {
    const bank = this.banksRepository.create(data);
    return this.banksRepository.save(bank);
  }

  async update(id: string, data: Partial<Bank>): Promise<Bank> {
    await this.findOne(id);
    await this.banksRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.banksRepository.delete(id);
  }

  async setCompanyBank(id: string): Promise<Bank> {
    await this.banksRepository.update({}, { isCompanyBank: false });
    await this.banksRepository.update(id, { isCompanyBank: true });
    return this.findOne(id);
  }
}
