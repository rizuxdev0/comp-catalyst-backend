import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ApprovalWorkflow } from './entities/approval-workflow.entity';
import { ApprovalStep } from './entities/approval-step.entity';
import { ApprovalRequest } from './entities/approval-request.entity';
import { ApprovalAction } from './entities/approval-action.entity';
export declare class ApprovalsService {
    private workflowRepository;
    private stepRepository;
    private requestRepository;
    private actionRepository;
    private eventEmitter;
    constructor(workflowRepository: Repository<ApprovalWorkflow>, stepRepository: Repository<ApprovalStep>, requestRepository: Repository<ApprovalRequest>, actionRepository: Repository<ApprovalAction>, eventEmitter: EventEmitter2);
    createRequest(data: {
        module: string;
        entityId: string;
        entityLabel: string;
        requesterId: string;
    }): Promise<ApprovalRequest>;
    findAllWorkflows(): Promise<ApprovalWorkflow[]>;
    findSteps(workflowId: string): Promise<ApprovalStep[]>;
    findAllRequests(): Promise<ApprovalRequest[]>;
    findOneRequest(id: string): Promise<ApprovalRequest>;
    approveRequest(id: string, userId: string, comment?: string): Promise<ApprovalRequest>;
    rejectRequest(id: string, userId: string, comment: string): Promise<ApprovalRequest>;
    findActions(requestId: string): Promise<ApprovalAction[]>;
}
