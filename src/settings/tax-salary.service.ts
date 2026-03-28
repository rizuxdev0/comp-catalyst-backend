import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryTaxSetting, SalaryGridItem } from './entities/tax-salary.entity';

@Injectable()
export class TaxSalaryService {
  constructor(
    @InjectRepository(CountryTaxSetting) private taxRepo: Repository<CountryTaxSetting>,
    @InjectRepository(SalaryGridItem) private salaryRepo: Repository<SalaryGridItem>,
  ) {}

  // ======= TAX SETTINGS =======
  findAllTaxSettings() { return this.taxRepo.find({ order: { country_name: 'ASC' } }); }
  createTaxSetting(data: Partial<CountryTaxSetting>) { return this.taxRepo.save(this.taxRepo.create(data)); }
  async updateTaxSetting(id: string, data: Partial<CountryTaxSetting>) {
    await this.taxRepo.update(id, data);
    return this.taxRepo.findOneBy({ id });
  }
  deleteTaxSetting(id: string) { return this.taxRepo.delete(id); }

  // ======= SALARY GRID =======
  findAllSalaryGrid() { return this.salaryRepo.find({ order: { category: 'ASC', echelon: 'ASC' } }); }
  createSalaryGrid(data: Partial<SalaryGridItem>) { return this.salaryRepo.save(this.salaryRepo.create(data)); }
  async updateSalaryGrid(id: string, data: Partial<SalaryGridItem>) {
    await this.salaryRepo.update(id, data);
    return this.salaryRepo.findOneBy({ id });
  }
  deleteSalaryGrid(id: string) { return this.salaryRepo.delete(id); }
}
