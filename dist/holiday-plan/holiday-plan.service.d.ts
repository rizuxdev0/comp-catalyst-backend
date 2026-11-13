import { Repository } from 'typeorm';
import { HolidayPlan } from './entities/holiday-plan.entity';
import { Employee } from '../employees/entities/employee.entity';
import { AuditService } from '../audit/audit.service';
export declare class HolidayPlanService {
    private planRepository;
    private employeeRepository;
    private auditService;
    constructor(planRepository: Repository<HolidayPlan>, employeeRepository: Repository<Employee>, auditService: AuditService);
    findAll(filters?: any): Promise<HolidayPlan[]>;
    create(data: Partial<HolidayPlan>, user: any): Promise<HolidayPlan>;
    approve(id: string, approvedBy: string): Promise<HolidayPlan>;
    reject(id: string, rejectionReason?: string): Promise<HolidayPlan>;
    update(id: string, data: Partial<HolidayPlan>): Promise<HolidayPlan>;
    cancel(id: string): Promise<HolidayPlan>;
    remove(id: string): Promise<HolidayPlan>;
    bulkCreate(plans: any[]): Promise<HolidayPlan[]>;
}
