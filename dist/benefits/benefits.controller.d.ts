import { BenefitsService } from './benefits.service';
export declare class BenefitsController {
    private readonly service;
    constructor(service: BenefitsService);
    findAll(): Promise<import("./entities/employee-benefit.entity").EmployeeBenefit[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/employee-benefit.entity").EmployeeBenefit[]>;
    findOne(id: string): Promise<import("./entities/employee-benefit.entity").EmployeeBenefit>;
    create(data: any): Promise<import("./entities/employee-benefit.entity").EmployeeBenefit>;
    update(id: string, data: any): Promise<import("./entities/employee-benefit.entity").EmployeeBenefit>;
    remove(id: string): Promise<void>;
}
