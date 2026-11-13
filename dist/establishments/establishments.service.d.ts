import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';
export declare class EstablishmentService {
    private establishmentRepository;
    private settingsRepository;
    constructor(establishmentRepository: Repository<Establishment>, settingsRepository: Repository<CompanySettings>);
    findAll(): Promise<Establishment[]>;
    findOne(id: string): Promise<Establishment>;
    create(data: Partial<Establishment>): Promise<Establishment>;
    update(id: string, data: Partial<Establishment>): Promise<Establishment>;
    remove(id: string): Promise<void>;
}
