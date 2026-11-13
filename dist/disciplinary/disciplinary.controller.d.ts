import { DisciplinaryService } from './disciplinary.service';
export declare class DisciplinaryController {
    private readonly service;
    constructor(service: DisciplinaryService);
    findAll(): Promise<import("./entities/disciplinary-action.entity").DisciplinaryAction[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/disciplinary-action.entity").DisciplinaryAction[]>;
    findOne(id: string): Promise<import("./entities/disciplinary-action.entity").DisciplinaryAction>;
    create(data: any, req: any): Promise<import("./entities/disciplinary-action.entity").DisciplinaryAction>;
    update(id: string, data: any): Promise<import("./entities/disciplinary-action.entity").DisciplinaryAction>;
    remove(id: string): Promise<void>;
}
