import { HolidayPlanService } from './holiday-plan.service';
export declare class HolidayPlanController {
    private readonly holidayPlanService;
    constructor(holidayPlanService: HolidayPlanService);
    create(data: any, req: any): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
    bulkCreate(plans: any[]): Promise<import("./entities/holiday-plan.entity").HolidayPlan[]>;
    findAll(departmentId?: string, employeeId?: string, year?: number): Promise<import("./entities/holiday-plan.entity").HolidayPlan[]>;
    update(id: string, data: any): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
    approve(id: string, req: any): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
    reject(id: string): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
    cancel(id: string): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
    remove(id: string): Promise<import("./entities/holiday-plan.entity").HolidayPlan>;
}
