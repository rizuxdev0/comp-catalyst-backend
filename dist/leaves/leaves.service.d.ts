import { Repository, DataSource } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { CompanySettings } from '../settings/entities/company-settings.entity';
import { ApprovalsService } from '../approvals/approvals.service';
import { AuditService } from '../audit/audit.service';
export declare class LeavesService {
    private requestRepository;
    private typeRepository;
    private balanceRepository;
    private companySettingsRepository;
    private approvalsService;
    private dataSource;
    private auditService;
    constructor(requestRepository: Repository<LeaveRequest>, typeRepository: Repository<LeaveType>, balanceRepository: Repository<LeaveBalance>, companySettingsRepository: Repository<CompanySettings>, approvalsService: ApprovalsService, dataSource: DataSource, auditService: AuditService);
    findAllTypes(): Promise<LeaveType[]>;
    findMyRequests(employeeId: string): Promise<LeaveRequest[]>;
    findAllRequests(status?: LeaveRequestStatus): Promise<LeaveRequest[]>;
    getBalances(employeeId: string, year: number): Promise<LeaveBalance[]>;
    createRequest(employeeId: string, data: Partial<LeaveRequest>): Promise<LeaveRequest>;
    approveRequest(id: string, approvedBy: string): Promise<LeaveRequest>;
    rejectRequest(id: string, reason: string): Promise<LeaveRequest>;
}
