import { ApprovalWorkflow } from './approval-workflow.entity';
export declare class ApprovalStep {
    id: string;
    workflowId: string;
    workflow: ApprovalWorkflow;
    stepOrder: number;
    approverType: string;
    approverRole: string;
    approverUserId: string;
    isRequired: boolean;
    createdAt: Date;
    updatedAt: Date;
}
