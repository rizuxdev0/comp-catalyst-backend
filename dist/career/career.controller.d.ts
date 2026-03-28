import { CareerService } from './career.service';
export declare class CareerController {
    private readonly service;
    constructor(service: CareerService);
    findAllHistory(employeeId?: string): Promise<import("./entities/career-history.entity").CareerHistory[]>;
    findAll(): Promise<import("./entities/career-history.entity").CareerHistory[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/career-history.entity").CareerHistory[]>;
    findOne(id: string): Promise<import("./entities/career-history.entity").CareerHistory>;
    create(data: any, req: any): Promise<import("./entities/career-history.entity").CareerHistory>;
    update(id: string, data: any): Promise<import("./entities/career-history.entity").CareerHistory>;
    remove(id: string): Promise<void>;
}
