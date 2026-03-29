import { Repository } from 'typeorm';
import { StaffDelegate, DelegateSetting } from './entities/staff-delegate.entity';
import { EmployeeUpdateRequest } from './entities/employee-update-request.entity';
export declare class StaffDelegatesService {
    private delegatesRepo;
    private settingsRepo;
    private updateRequestsRepo;
    constructor(delegatesRepo: Repository<StaffDelegate>, settingsRepo: Repository<DelegateSetting>, updateRequestsRepo: Repository<EmployeeUpdateRequest>);
    findAllDelegates(): Promise<StaffDelegate[]>;
    createDelegate(data: Partial<StaffDelegate>): Promise<StaffDelegate>;
    updateDelegate(id: string, data: Partial<StaffDelegate>): Promise<StaffDelegate>;
    findAllDelegateSettings(): Promise<DelegateSetting[]>;
    createOrUpdateDelegateSetting(data: Partial<DelegateSetting>): Promise<DelegateSetting>;
    findAllUpdateRequests(): Promise<EmployeeUpdateRequest[]>;
    createUpdateRequest(data: Partial<EmployeeUpdateRequest>): Promise<EmployeeUpdateRequest>;
    updateUpdateRequest(id: string, data: Partial<EmployeeUpdateRequest>): Promise<EmployeeUpdateRequest>;
}
