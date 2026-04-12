"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("./entities/contract.entity");
const contract_type_entity_1 = require("./entities/contract-type.entity");
const audit_service_1 = require("../audit/audit.service");
let ContractsService = class ContractsService {
    constructor(contractRepository, contractTypeRepository, auditService) {
        this.contractRepository = contractRepository;
        this.contractTypeRepository = contractTypeRepository;
        this.auditService = auditService;
    }
    async onModuleInit() {
        await this.seedContractTypes();
    }
    async seedContractTypes() {
        const count = await this.contractTypeRepository.count();
        console.log('Synchronizing default contract types (Togo 2021)...');
        const defaultTypes = [
            {
                code: 'CDI_CADRE',
                name: 'CDI - Cadre / Ingénieur',
                isPermanent: true,
                defaultTrialPeriodDays: 180,
                defaultNoticePeriodDays: 90,
                suggestedWorkerCategory: 'Cadre'
            },
            {
                code: 'CDI_AG_MAITRISE',
                name: 'CDI - Technicien / Agent de Maîtrise',
                isPermanent: true,
                defaultTrialPeriodDays: 90,
                defaultNoticePeriodDays: 90,
                suggestedWorkerCategory: 'Agent de Maîtrise'
            },
            {
                code: 'CDI_EMPLOYE',
                name: 'CDI - Employé / Assimilé',
                isPermanent: true,
                defaultTrialPeriodDays: 30,
                defaultNoticePeriodDays: 30,
                suggestedWorkerCategory: 'Employé'
            },
            {
                code: 'CDI_OUVRIER',
                name: 'CDI - Ouvrier',
                isPermanent: true,
                defaultTrialPeriodDays: 15,
                defaultNoticePeriodDays: 15,
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
            }
            else {
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
    async create(createContractDto) {
        const contract = this.contractRepository.create(createContractDto);
        if (!contract.contractNumber) {
            const year = new Date().getFullYear();
            const count = await this.contractRepository.count();
            contract.contractNumber = `CONT-${year}-${String(count + 1).padStart(4, '0')}`;
        }
        const saved = await this.contractRepository.save(contract);
        await this.auditService.log({
            action: 'create',
            entityType: 'contract',
            entityId: saved.id,
            entityName: saved.contractNumber || saved.id,
            newValues: createContractDto,
        });
        return saved;
    }
    async findAll(employeeId) {
        const where = employeeId ? { employeeId } : {};
        return this.contractRepository.find({
            where,
            relations: ['employee', 'contractType'],
            order: { startDate: 'DESC' },
        });
    }
    async findOne(id) {
        const contract = await this.contractRepository.findOne({
            where: { id },
            relations: ['employee', 'contractType'],
        });
        if (!contract) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return contract;
    }
    async update(id, updateData) {
        const old = await this.findOne(id);
        await this.contractRepository.update(id, updateData);
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
    async remove(id) {
        const old = await this.findOne(id);
        await this.contractRepository.delete(id);
        await this.auditService.log({
            action: 'delete',
            entityType: 'contract',
            entityId: id,
            entityName: old.contractNumber || id,
        });
    }
    async findExpiring(days = 30) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return this.contractRepository.createQueryBuilder('contract')
            .leftJoinAndSelect('contract.employee', 'employee')
            .leftJoinAndSelect('contract.contractType', 'contractType')
            .where('contract.endDate <= :date', { date })
            .andWhere('contract.status = :status', { status: 'active' })
            .getMany();
    }
    async findContractTypes() {
        return this.contractTypeRepository.find({ order: { name: 'ASC' } });
    }
    async findContractType(id) {
        const type = await this.contractTypeRepository.findOne({ where: { id } });
        if (!type)
            throw new common_1.NotFoundException('Contract type not found');
        return type;
    }
    async createContractType(data) {
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
    async updateContractType(id, data) {
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
    async removeContractType(id) {
        const old = await this.findContractType(id);
        await this.contractTypeRepository.delete(id);
        await this.auditService.log({
            action: 'delete',
            entityType: 'contract_type',
            entityId: id,
            entityName: old.name,
        });
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(1, (0, typeorm_1.InjectRepository)(contract_type_entity_1.ContractType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        audit_service_1.AuditService])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map