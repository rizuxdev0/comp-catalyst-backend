import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { ContractType } from './entities/contract-type.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class ContractsService implements OnModuleInit {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(ContractType)
    private contractTypeRepository: Repository<ContractType>,
    private auditService: AuditService,
  ) {}

  async onModuleInit() {
    await this.seedContractTypes();
  }

  private async seedContractTypes() {
    const count = await this.contractTypeRepository.count();
    
    console.log('Synchronizing default contract types (Togo 2021)...');
    const defaultTypes = [
      { 
        code: 'CDI_CADRE', 
        name: 'CDI - Cadre / Ingénieur', 
        isPermanent: true, 
        defaultTrialPeriodDays: 180, // 6 mois
        defaultNoticePeriodDays: 90,  // 3 mois
        suggestedWorkerCategory: 'Cadre' 
      },
      { 
        code: 'CDI_AG_MAITRISE', 
        name: 'CDI - Technicien / Agent de Maîtrise', 
        isPermanent: true, 
        defaultTrialPeriodDays: 90,  // 3 mois
        defaultNoticePeriodDays: 90,  // 3 mois
        suggestedWorkerCategory: 'Agent de Maîtrise' 
      },
      { 
        code: 'CDI_EMPLOYE', 
        name: 'CDI - Employé / Assimilé', 
        isPermanent: true, 
        defaultTrialPeriodDays: 30,  // 1 mois
        defaultNoticePeriodDays: 30,  // 1 mois
        suggestedWorkerCategory: 'Employé' 
      },
      { 
        code: 'CDI_OUVRIER', 
        name: 'CDI - Ouvrier', 
        isPermanent: true, 
        defaultTrialPeriodDays: 15,  // 15 jours (Code 2021)
        defaultNoticePeriodDays: 15,  // 15 jours
        suggestedWorkerCategory: 'Ouvrier' 
      },
      { 
        code: 'CDD', 
        name: 'CDD (Contrat à Durée Déterminée)', 
        isPermanent: false, 
        defaultTrialPeriodDays: 30, 
        defaultNoticePeriodDays: 30 
      },
      { 
        code: 'STAGE', 
        name: 'Contrat de Stage', 
        isPermanent: false, 
        defaultTrialPeriodDays: 0, 
        defaultNoticePeriodDays: 0 
      },
    ];

    for (const typeData of defaultTypes) {
      const exists = await this.contractTypeRepository.findOne({ where: { code: typeData.code } });
      if (!exists) {
        await this.contractTypeRepository.save(this.contractTypeRepository.create(typeData));
      } else {
        // Optionnel: Mettre à jour les valeurs si elles sont nulles
        if (exists.defaultTrialPeriodDays === null || exists.defaultNoticePeriodDays === null) {
          await this.contractTypeRepository.update(exists.id, {
            defaultTrialPeriodDays: typeData.defaultTrialPeriodDays,
            defaultNoticePeriodDays: typeData.defaultNoticePeriodDays,
            suggestedWorkerCategory: exists.suggestedWorkerCategory || typeData.suggestedWorkerCategory
          });
        }
      }
    }
  }

  async create(createContractDto: Partial<Contract>): Promise<Contract> {
    const contract = this.contractRepository.create(createContractDto);
    const saved = await this.contractRepository.save(contract);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'create',
      entityType: 'contract',
      entityId: saved.id,
      entityName: saved.contractNumber || saved.id,
      newValues: createContractDto,
    });
    
    return saved;
  }

  async findAll(employeeId?: string): Promise<Contract[]> {
    const where = employeeId ? { employeeId } : {};
    return this.contractRepository.find({
      where,
      relations: ['employee', 'contractType'],
      order: { startDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: ['employee', 'contractType'],
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return contract;
  }

  async update(id: string, updateData: Partial<Contract>): Promise<Contract> {
    const old = await this.findOne(id);
    await this.contractRepository.update(id, updateData);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'update',
      entityType: 'contract',
      entityId: id,
      entityName: old.contractNumber || id,
      oldValues: old,
      newValues: updateData,
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const old = await this.findOne(id);
    await this.contractRepository.delete(id);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'delete',
      entityType: 'contract',
      entityId: id,
      entityName: old.contractNumber || id,
    });
  }

  async findExpiring(days: number = 30): Promise<Contract[]> {
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    return this.contractRepository.createQueryBuilder('contract')
      .leftJoinAndSelect('contract.employee', 'employee')
      .leftJoinAndSelect('contract.contractType', 'contractType')
      .where('contract.endDate <= :date', { date })
      .andWhere('contract.status = :status', { status: 'active' })
      .getMany();
  }

  // CONTRACT TYPES CRUD
  async findContractTypes(): Promise<ContractType[]> {
    return this.contractTypeRepository.find({ order: { name: 'ASC' } });
  }

  async findContractType(id: string): Promise<ContractType> {
    const type = await this.contractTypeRepository.findOne({ where: { id } });
    if (!type) throw new NotFoundException('Contract type not found');
    return type;
  }

  async createContractType(data: Partial<ContractType>): Promise<ContractType> {
    const type = this.contractTypeRepository.create(data);
    const saved = await this.contractTypeRepository.save(type);
    await this.auditService.log({
      action: 'create',
      entityType: 'contract_type',
      entityId: saved.id,
      entityName: saved.name,
      newValues: data,
    });
    return saved;
  }

  async updateContractType(id: string, data: Partial<ContractType>): Promise<ContractType> {
    const old = await this.findContractType(id);
    await this.contractTypeRepository.update(id, data);
    await this.auditService.log({
      action: 'update',
      entityType: 'contract_type',
      entityId: id,
      entityName: old.name,
      oldValues: old,
      newValues: data,
    });
    return this.findContractType(id);
  }

  async removeContractType(id: string): Promise<void> {
    const old = await this.findContractType(id);
    await this.contractTypeRepository.delete(id);
    await this.auditService.log({
      action: 'delete',
      entityType: 'contract_type',
      entityId: id,
      entityName: old.name,
    });
  }
}
