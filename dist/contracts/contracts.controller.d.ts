import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';
import { ContractType } from './entities/contract-type.entity';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(createContractDto: Partial<Contract>): Promise<Contract>;
    findAll(employeeId?: string): Promise<Contract[]>;
    findExpiring(): Promise<Contract[]>;
    findOne(id: string): Promise<Contract>;
    update(id: string, updateData: Partial<Contract>): Promise<Contract>;
    remove(id: string): Promise<void>;
    findContractTypes(): Promise<ContractType[]>;
    findContractType(id: string): Promise<ContractType>;
    createType(data: Partial<ContractType>): Promise<ContractType>;
    updateType(id: string, data: Partial<ContractType>): Promise<ContractType>;
    removeType(id: string): Promise<void>;
}
