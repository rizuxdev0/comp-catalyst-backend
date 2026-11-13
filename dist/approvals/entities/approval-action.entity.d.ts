import { ApprovalRequest } from './approval-request.entity';
export declare class ApprovalAction {
    id: string;
    requestId: string;
    request: ApprovalRequest;
    stepOrder: number;
    action: string;
    comment: string;
    actedBy: string;
    actedAt: Date;
}
