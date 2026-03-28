import { LeavesService } from './leaves.service';
import { LeaveRequest, LeaveRequestStatus } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    findAllTypes(): Promise<LeaveType[]>;
    findMyRequests(req: any): Promise<LeaveRequest[]>;
    findAllRequests(status?: LeaveRequestStatus): Promise<LeaveRequest[]>;
    getMyBalances(req: any, year?: number): Promise<LeaveBalance[]>;
    createRequest(req: any, data: Partial<LeaveRequest>): Promise<LeaveRequest>;
    approveRequest(id: string, req: any): Promise<LeaveRequest>;
    rejectRequest(id: string, reason: string): Promise<LeaveRequest>;
}
