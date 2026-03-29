"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const eventemitter2_1 = require("eventemitter2");
const approval_workflow_entity_1 = require("./entities/approval-workflow.entity");
const approval_step_entity_1 = require("./entities/approval-step.entity");
const approval_request_entity_1 = require("./entities/approval-request.entity");
const approval_action_entity_1 = require("./entities/approval-action.entity");
let ApprovalsService = class ApprovalsService {
    constructor(workflowRepository, stepRepository, requestRepository, actionRepository, eventEmitter) {
        this.workflowRepository = workflowRepository;
        this.stepRepository = stepRepository;
        this.requestRepository = requestRepository;
        this.actionRepository = actionRepository;
        this.eventEmitter = eventEmitter;
    }
    async createRequest(data) {
        const workflow = await this.workflowRepository.findOne({ where: { module: data.module, isActive: true } });
        if (!workflow)
            throw new common_1.NotFoundException(`No active approval workflow found for module: ${data.module}`);
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
    async findAllWorkflows() {
        return this.workflowRepository.find({ where: { isActive: true }, order: { module: 'ASC' } });
    }
    async findSteps(workflowId) {
        return this.stepRepository.find({ where: { workflowId }, order: { stepOrder: 'ASC' } });
    }
    async findAllRequests() {
        return this.requestRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOneRequest(id) {
        const request = await this.requestRepository.findOne({ where: { id } });
        if (!request)
            throw new common_1.NotFoundException('Approval request not found');
        return request;
    }
    async approveRequest(id, userId, comment) {
        const request = await this.findOneRequest(id);
        const actionData = this.actionRepository.create({
            requestId: id,
            stepOrder: request.currentStep,
            action: 'approved',
            comment: comment || null,
            actedBy: userId,
        });
        await this.actionRepository.save(actionData);
        const nextStep = await this.stepRepository.findOne({
            where: { workflowId: request.workflowId, stepOrder: request.currentStep + 1 },
            order: { stepOrder: 'ASC' }
        });
        if (nextStep) {
            request.currentStep = nextStep.stepOrder;
        }
        else {
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
    async rejectRequest(id, userId, comment) {
        const request = await this.findOneRequest(id);
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
    async findActions(requestId) {
        return this.actionRepository.find({ where: { requestId }, order: { actedAt: 'ASC' } });
    }
};
exports.ApprovalsService = ApprovalsService;
exports.ApprovalsService = ApprovalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(approval_workflow_entity_1.ApprovalWorkflow)),
    __param(1, (0, typeorm_1.InjectRepository)(approval_step_entity_1.ApprovalStep)),
    __param(2, (0, typeorm_1.InjectRepository)(approval_request_entity_1.ApprovalRequest)),
    __param(3, (0, typeorm_1.InjectRepository)(approval_action_entity_1.ApprovalAction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        eventemitter2_1.EventEmitter2])
], ApprovalsService);
//# sourceMappingURL=approvals.service.js.map