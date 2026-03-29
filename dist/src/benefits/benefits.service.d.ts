import { Repository } from 'typeorm';
import { EmployeeBenefit } from './entities/employee-benefit.entity';
export declare class BenefitsService {
    private repo;
    constructor(repo: Repository<EmployeeBenefit>);
    findAll(): Promise<EmployeeBenefit[]>;
    findByEmployee(employeeId: string): Promise<EmployeeBenefit[]>;
    findOne(id: string): Promise<EmployeeBenefit>;
    create(data: Partial<EmployeeBenefit>): Promise<EmployeeBenefit>;
    update(id: string, data: Partial<EmployeeBenefit>): Promise<EmployeeBenefit>;
    remove(id: string): Promise<void>;
}
