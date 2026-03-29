import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
export declare class CurrenciesService {
    private currenciesRepository;
    constructor(currenciesRepository: Repository<Currency>);
    findAll(): Promise<Currency[]>;
    findOne(id: string): Promise<Currency>;
    create(data: Partial<Currency>): Promise<Currency>;
    update(id: string, data: Partial<Currency>): Promise<Currency>;
    remove(id: string): Promise<void>;
    setDefault(id: string): Promise<Currency>;
}
