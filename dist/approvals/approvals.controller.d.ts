import { ApprovalsService } from './approvals.service';
export declare class ApprovalsController {
    private readonly approvalsService;
    constructor(approvalsService: ApprovalsService);
    getWorkflows(): Promise<import("./entities/approval-workflow.entity").ApprovalWorkflow[]>;
    getSteps(id: string): Promise<import("./entities/approval-step.entity").ApprovalStep[]>;
    getRequests(): Promise<import("./entities/approval-request.entity").ApprovalRequest[]>;
    approveRequest(id: string, req: any, comment?: string): Promise<import("./entities/approval-request.entity").ApprovalRequest>;
    rejectRequest(id: string, req: any, comment: string): Promise<import("./entities/approval-request.entity").ApprovalRequest>;
    getActions(id: string): Promise<import("./entities/approval-action.entity").ApprovalAction[]>;
}
