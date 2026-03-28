import { Repository } from 'typeorm';
import { MedicalAssistance } from './entities/medical-assistance.entity';
export declare class MedicalService {
    private repo;
    constructor(repo: Repository<MedicalAssistance>);
    findAll(): Promise<MedicalAssistance[]>;
    findOne(id: string): Promise<MedicalAssistance>;
    findByEmployee(employeeId: string): Promise<MedicalAssistance[]>;
    create(data: Partial<MedicalAssistance>): Promise<MedicalAssistance>;
    update(id: string, data: Partial<MedicalAssistance>): Promise<MedicalAssistance>;
    remove(id: string): Promise<void>;
    approve(id: string, approverId: string, amountApproved: number): Promise<MedicalAssistance>;
    reject(id: string, reason: string): Promise<MedicalAssistance>;
}
