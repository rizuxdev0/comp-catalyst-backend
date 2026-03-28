import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalAssistance } from './entities/medical-assistance.entity';

@Injectable()
export class MedicalService {
  constructor(
    @InjectRepository(MedicalAssistance)
    private repo: Repository<MedicalAssistance>,
  ) {}

  findAll(): Promise<MedicalAssistance[]> {
    return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findOne(id: string): Promise<MedicalAssistance> {
    const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Assistance médicale non trouvée');
    return item;
  }

  findByEmployee(employeeId: string): Promise<MedicalAssistance[]> {
    return this.repo.find({
      where: { employee_id: employeeId },
      order: { created_at: 'DESC' },
    });
  }

  create(data: Partial<MedicalAssistance>): Promise<MedicalAssistance> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: string, data: Partial<MedicalAssistance>): Promise<MedicalAssistance> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async approve(id: string, approverId: string, amountApproved: number): Promise<MedicalAssistance> {
    await this.repo.update(id, {
      status: 'approved',
      approved_by: approverId,
      approved_at: new Date(),
      amount_approved: amountApproved,
    });
    return this.findOne(id);
  }

  async reject(id: string, reason: string): Promise<MedicalAssistance> {
    await this.repo.update(id, { status: 'rejected', rejection_reason: reason });
    return this.findOne(id);
  }
}
