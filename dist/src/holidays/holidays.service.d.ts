import { Repository } from 'typeorm';
import { Holiday } from './entities/holiday.entity';
export declare class HolidaysService {
    private holidayRepository;
    constructor(holidayRepository: Repository<Holiday>);
    findAll(): Promise<Holiday[]>;
    findByYear(year: number): Promise<Holiday[]>;
    create(data: Partial<Holiday>): Promise<Holiday>;
    update(id: string, data: Partial<Holiday>): Promise<Holiday>;
    remove(id: string): Promise<void>;
}
