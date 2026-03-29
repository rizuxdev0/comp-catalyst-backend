import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
export declare class FleetService {
    private vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    findAll(): Promise<Vehicle[]>;
    findOne(id: string): Promise<Vehicle>;
    create(data: Partial<Vehicle>): Promise<Vehicle>;
    update(id: string, data: Partial<Vehicle>): Promise<Vehicle>;
    remove(id: string): Promise<void>;
    assignToEmployee(id: string, employeeId: string): Promise<Vehicle>;
    unassign(id: string): Promise<Vehicle>;
}
