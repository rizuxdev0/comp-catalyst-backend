import { ApprovalWorkflow } from './approval-workflow.entity';
export declare class ApprovalRequest {
    id: string;
    workflowId: string;
    workflow: ApprovalWorkflow;
    module: string;
    entityId: string;
    entityLabel: string;
    requesterId: string;
    currentStep: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}
