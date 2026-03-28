import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ApprovalWorkflow } from './entities/approval-workflow.entity';
import { ApprovalStep } from './entities/approval-step.entity';
import { ApprovalRequest } from './entities/approval-request.entity';
import { ApprovalAction } from './entities/approval-action.entity';

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(ApprovalWorkflow)
    private workflowRepository: Repository<ApprovalWorkflow>,
    @InjectRepository(ApprovalStep)
    private stepRepository: Repository<ApprovalStep>,
    @InjectRepository(ApprovalRequest)
    private requestRepository: Repository<ApprovalRequest>,
    @InjectRepository(ApprovalAction)
    private actionRepository: Repository<ApprovalAction>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createRequest(data: { module: string, entityId: string, entityLabel: string, requesterId: string }): Promise<ApprovalRequest> {
    const workflow = await this.workflowRepository.findOne({ where: { module: data.module, isActive: true } });
    if (!workflow) throw new NotFoundException(`No active approval workflow found for module: ${data.module}`);

    const request = this.requestRepository.create({
      workflowId: workflow.id,
      module: data.module,
      entityId: data.entityId,
      entityLabel: data.entityLabel,
      requesterId: data.requesterId,
      currentStep: 1,
      status: 'pending',
    });

    const saved = await this.requestRepository.save(request);

    this.eventEmitter.emit('audit.log', {
      action: 'create_approval_request',
      entityType: 'approval_request',
      entityId: saved.id,
      entityName: saved.entityLabel,
      newValues: { module: saved.module, entityId: saved.entityId },
    });

    return saved;
  }

  async findAllWorkflows(): Promise<ApprovalWorkflow[]> {
    return this.workflowRepository.find({ where: { isActive: true }, order: { module: 'ASC' } });
  }

  async findSteps(workflowId: string): Promise<ApprovalStep[]> {
    return this.stepRepository.find({ where: { workflowId }, order: { stepOrder: 'ASC' } });
  }

  async findAllRequests(): Promise<ApprovalRequest[]> {
    return this.requestRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneRequest(id: string): Promise<ApprovalRequest> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Approval request not found');
    return request;
  }

  async approveRequest(id: string, userId: string, comment?: string): Promise<ApprovalRequest> {
    const request = await this.findOneRequest(id);
    
    // Log the action
    const actionData = this.actionRepository.create({
      requestId: id,
      stepOrder: request.currentStep,
      action: 'approved',
      comment: comment || null,
      actedBy: userId,
    });
    await this.actionRepository.save(actionData);

    // Check for next step
    const nextStep = await this.stepRepository.findOne({
      where: { workflowId: request.workflowId, stepOrder: request.currentStep + 1 },
      order: { stepOrder: 'ASC' }
    });

    if (nextStep) {
      request.currentStep = nextStep.stepOrder;
    } else {
      request.status = 'approved';
      request.completedAt = new Date();
    }
    
    request.updatedAt = new Date();
    const saved = await this.requestRepository.save(request);

    if (saved.status === 'approved') {
      this.eventEmitter.emit('approval.completed', {
        module: saved.module,
        entityId: saved.entityId,
        userId,
      });
    }

    this.eventEmitter.emit('audit.log', {
      action: 'approve_step',
      entityType: 'approval_request',
      entityId: id,
      entityName: saved.entityLabel,
      newValues: { status: saved.status, currentStep: saved.currentStep },
      userId,
    });

    return saved;
  }

  async rejectRequest(id: string, userId: string, comment: string): Promise<ApprovalRequest> {
    const request = await this.findOneRequest(id);

    // Log the action
    const actionData = this.actionRepository.create({
      requestId: id,
      stepOrder: request.currentStep,
      action: 'rejected',
      comment,
      actedBy: userId,
    });
    await this.actionRepository.save(actionData);

    request.status = 'rejected';
    request.completedAt = new Date();
    request.updatedAt = new Date();
    const saved = await this.requestRepository.save(request);

    this.eventEmitter.emit('approval.rejected', {
      module: saved.module,
      entityId: saved.entityId,
      userId,
    });

    this.eventEmitter.emit('audit.log', {
      action: 'reject_request',
      entityType: 'approval_request',
      entityId: id,
      entityName: saved.entityLabel,
      newValues: { comment },
      userId,
    });

    return saved;
  }

  async findActions(requestId: string): Promise<ApprovalAction[]> {
    return this.actionRepository.find({ where: { requestId }, order: { actedAt: 'ASC' } });
  }
}
