import { StaffDelegatesService } from './staff-delegates.service';
export declare class StaffDelegatesController {
    private readonly svc;
    constructor(svc: StaffDelegatesService);
    getDelegates(): Promise<import("./entities/staff-delegate.entity").StaffDelegate[]>;
    createDelegate(data: any): Promise<import("./entities/staff-delegate.entity").StaffDelegate>;
    updateDelegate(id: string, data: any): Promise<import("./entities/staff-delegate.entity").StaffDelegate>;
    getDelegateSettings(): Promise<import("./entities/staff-delegate.entity").DelegateSetting[]>;
    upsertDelegateSetting(data: any): Promise<import("./entities/staff-delegate.entity").DelegateSetting>;
    getUpdateRequests(): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest[]>;
    createUpdateRequest(data: any): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest>;
    updateUpdateRequest(id: string, data: any): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest>;
}
