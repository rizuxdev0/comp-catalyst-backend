import { AccidentsService } from './accidents.service';
export declare class AccidentsController {
    private readonly service;
    constructor(service: AccidentsService);
    findAll(): Promise<import("./entities/work-accident.entity").WorkAccident[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/work-accident.entity").WorkAccident[]>;
    findOne(id: string): Promise<import("./entities/work-accident.entity").WorkAccident>;
    create(data: any, req: any): Promise<import("./entities/work-accident.entity").WorkAccident>;
    update(id: string, data: any): Promise<import("./entities/work-accident.entity").WorkAccident>;
    remove(id: string): Promise<void>;
}
