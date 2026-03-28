import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffDelegate, DelegateSetting } from './entities/staff-delegate.entity';
import { EmployeeUpdateRequest } from './entities/employee-update-request.entity';

@Injectable()
export class StaffDelegatesService {
  constructor(
    @InjectRepository(StaffDelegate) private delegatesRepo: Repository<StaffDelegate>,
    @InjectRepository(DelegateSetting) private settingsRepo: Repository<DelegateSetting>,
    @InjectRepository(EmployeeUpdateRequest) private updateRequestsRepo: Repository<EmployeeUpdateRequest>,
  ) {}

  // ======= STAFF DELEGATES =======
  findAllDelegates() { return this.delegatesRepo.find({ order: { mandate_start_date: 'DESC' } }); }
  createDelegate(data: Partial<StaffDelegate>) { return this.delegatesRepo.save(this.delegatesRepo.create(data)); }
  async updateDelegate(id: string, data: Partial<StaffDelegate>) {
    await this.delegatesRepo.update(id, data);
    return this.delegatesRepo.findOneBy({ id });
  }

  // ======= DELEGATE SETTINGS =======
  findAllDelegateSettings() { return this.settingsRepo.find(); }
  createOrUpdateDelegateSetting(data: Partial<DelegateSetting>) {
    // Upsert equivalent
    return this.settingsRepo.save(this.settingsRepo.create(data));
  }

  // ======= EMPLOYEE UPDATE REQUESTS =======
  findAllUpdateRequests() { return this.updateRequestsRepo.find({ order: { created_at: 'DESC' } }); }
  createUpdateRequest(data: Partial<EmployeeUpdateRequest>) { return this.updateRequestsRepo.save(this.updateRequestsRepo.create(data)); }
  async updateUpdateRequest(id: string, data: Partial<EmployeeUpdateRequest>) {
    await this.updateRequestsRepo.update(id, data);
    return this.updateRequestsRepo.findOneBy({ id });
  }
}
