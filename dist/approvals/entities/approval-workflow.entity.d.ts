import { ApprovalStep } from './approval-step.entity';
export declare class ApprovalWorkflow {
    id: string;
    module: string;
    name: string;
    description: string;
    isActive: boolean;
    autoEscalateHours: number;
    steps: ApprovalStep[];
    createdAt: Date;
    updatedAt: Date;
}
