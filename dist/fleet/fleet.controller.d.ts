import { FleetService } from './fleet.service';
export declare class FleetController {
    private readonly fleetService;
    constructor(fleetService: FleetService);
    findAll(): Promise<import("./entities/vehicle.entity").Vehicle[]>;
    create(data: any): Promise<import("./entities/vehicle.entity").Vehicle>;
    update(id: string, data: any): Promise<import("./entities/vehicle.entity").Vehicle>;
    remove(id: string): Promise<void>;
    assign(id: string, employeeId: string): Promise<import("./entities/vehicle.entity").Vehicle>;
    unassign(id: string): Promise<import("./entities/vehicle.entity").Vehicle>;
}
