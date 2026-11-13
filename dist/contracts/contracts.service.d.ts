import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { ContractType } from './entities/contract-type.entity';
import { AuditService } from '../audit/audit.service';
export declare class ContractsService implements OnModuleInit {
    private contractRepository;
    private contractTypeRepository;
    private auditService;
    constructor(contractRepository: Repository<Contract>, contractTypeRepository: Repository<ContractType>, auditService: AuditService);
    onModuleInit(): Promise<void>;
    private seedContractTypes;
    create(createContractDto: Partial<Contract>): Promise<Contract>;
    findAll(employeeId?: string): Promise<Contract[]>;
    findOne(id: string): Promise<Contract>;
    update(id: string, updateData: Partial<Contract>): Promise<Contract>;
    remove(id: string): Promise<void>;
    findExpiring(days?: number): Promise<Contract[]>;
    findContractTypes(): Promise<ContractType[]>;
    findContractType(id: string): Promise<ContractType>;
    createContractType(data: Partial<ContractType>): Promise<ContractType>;
    updateContractType(id: string, data: Partial<ContractType>): Promise<ContractType>;
    removeContractType(id: string): Promise<void>;
}
