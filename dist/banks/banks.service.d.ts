import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';
export declare class BanksService {
    private banksRepository;
    constructor(banksRepository: Repository<Bank>);
    findAll(): Promise<Bank[]>;
    findOne(id: string): Promise<Bank>;
    create(data: Partial<Bank>): Promise<Bank>;
    update(id: string, data: Partial<Bank>): Promise<Bank>;
    remove(id: string): Promise<void>;
    setCompanyBank(id: string): Promise<Bank>;
}
