import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseClaim } from './entities/expense-claim.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseClaim)
    private expenseRepository: Repository<ExpenseClaim>,
  ) {}

  async findAll(): Promise<ExpenseClaim[]> {
    return this.expenseRepository.find({ order: { createdAt: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<ExpenseClaim> {
    const claim = await this.expenseRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!claim) throw new NotFoundException('Expense claim not found');
    return claim;
  }

  async create(data: Partial<ExpenseClaim>): Promise<ExpenseClaim> {
    const claim = this.expenseRepository.create(data);
    return this.expenseRepository.save(claim);
  }

  async update(id: string, data: Partial<ExpenseClaim>): Promise<ExpenseClaim> {
    await this.expenseRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.expenseRepository.delete(id);
  }

  async findByEmployee(employeeId: string): Promise<ExpenseClaim[]> {
    return this.expenseRepository.find({ where: { employeeId }, order: { createdAt: 'DESC' } });
  }
}
