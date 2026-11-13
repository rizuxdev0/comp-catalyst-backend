import { LeavesService } from './leaves.service';
export declare class LeavesListener {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    handleApprovalCompleted(payload: {
        module: string;
        entityId: string;
        userId: string;
    }): Promise<void>;
    handleApprovalRejected(payload: {
        module: string;
        entityId: string;
        userId: string;
    }): Promise<void>;
}
