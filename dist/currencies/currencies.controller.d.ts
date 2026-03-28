import { CurrenciesService } from './currencies.service';
export declare class CurrenciesController {
    private readonly currenciesService;
    constructor(currenciesService: CurrenciesService);
    findAll(): Promise<import("./entities/currency.entity").Currency[]>;
    findOne(id: string): Promise<import("./entities/currency.entity").Currency>;
    create(body: any): Promise<import("./entities/currency.entity").Currency>;
    update(id: string, body: any): Promise<import("./entities/currency.entity").Currency>;
    remove(id: string): Promise<void>;
    setDefault(id: string): Promise<import("./entities/currency.entity").Currency>;
}
