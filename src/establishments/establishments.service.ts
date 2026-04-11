import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
    @InjectRepository(CompanySettings)
    private settingsRepository: Repository<CompanySettings>,
  ) {}

  async findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.find({
      relations: ['company'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!establishment) throw new NotFoundException('Establishment not found');
    return establishment;
  }

  async create(data: Partial<Establishment>): Promise<Establishment> {
    // Get the first company settings as parent if not provided
    if (!data.company_id) {
      const settings = await this.settingsRepository.findOne({ where: {} });
      if (settings) {
        data.company_id = settings.id;
      }
    }
    
    const establishment = this.establishmentRepository.create(data);
    return this.establishmentRepository.save(establishment);
  }

  async update(id: string, data: Partial<Establishment>): Promise<Establishment> {
    await this.findOne(id);
    await this.establishmentRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const establishment = await this.findOne(id);
    await this.establishmentRepository.remove(establishment);
  }
}
