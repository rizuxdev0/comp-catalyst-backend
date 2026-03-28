import { BanksService } from './banks.service';
export declare class BanksController {
    private readonly banksService;
    constructor(banksService: BanksService);
    findAll(): Promise<import("./entities/bank.entity").Bank[]>;
    findOne(id: string): Promise<import("./entities/bank.entity").Bank>;
    create(body: any): Promise<import("./entities/bank.entity").Bank>;
    update(id: string, body: any): Promise<import("./entities/bank.entity").Bank>;
    remove(id: string): Promise<void>;
    setCompanyBank(id: string): Promise<import("./entities/bank.entity").Bank>;
}
