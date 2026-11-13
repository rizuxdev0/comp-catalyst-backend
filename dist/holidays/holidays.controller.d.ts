import { HolidaysService } from './holidays.service';
export declare class HolidaysController {
    private readonly holidaysService;
    constructor(holidaysService: HolidaysService);
    findAll(year?: number): Promise<import("./entities/holiday.entity").Holiday[]>;
    create(data: any): Promise<import("./entities/holiday.entity").Holiday>;
    update(id: string, data: any): Promise<import("./entities/holiday.entity").Holiday>;
    remove(id: string): Promise<void>;
}
