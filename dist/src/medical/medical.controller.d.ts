import { MedicalService } from './medical.service';
export declare class MedicalController {
    private readonly service;
    constructor(service: MedicalService);
    findAll(): Promise<import("./entities/medical-assistance.entity").MedicalAssistance[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/medical-assistance.entity").MedicalAssistance[]>;
    findOne(id: string): Promise<import("./entities/medical-assistance.entity").MedicalAssistance>;
    create(data: any, req: any): Promise<import("./entities/medical-assistance.entity").MedicalAssistance>;
    update(id: string, data: any): Promise<import("./entities/medical-assistance.entity").MedicalAssistance>;
    approve(id: string, body: {
        amount_approved: number;
    }, req: any): Promise<import("./entities/medical-assistance.entity").MedicalAssistance>;
    reject(id: string, body: {
        reason: string;
    }): Promise<import("./entities/medical-assistance.entity").MedicalAssistance>;
    remove(id: string): Promise<void>;
}
