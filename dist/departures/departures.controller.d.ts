import { DeparturesService } from './departures.service';
export declare class DeparturesController {
    private readonly service;
    constructor(service: DeparturesService);
    findAll(): Promise<import("./entities/departure.entity").Departure[]>;
    findOne(id: string): Promise<import("./entities/departure.entity").Departure>;
    create(data: any, req: any): Promise<import("./entities/departure.entity").Departure>;
    update(id: string, data: any): Promise<import("./entities/departure.entity").Departure>;
    complete(id: string): Promise<import("./entities/departure.entity").Departure>;
    remove(id: string): Promise<void>;
}
