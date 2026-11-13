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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRequest = void 0;
const typeorm_1 = require("typeorm");
const approval_workflow_entity_1 = require("./approval-workflow.entity");
let ApprovalRequest = class ApprovalRequest {
};
exports.ApprovalRequest = ApprovalRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'workflow_id', type: 'uuid' }),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "workflowId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_workflow_entity_1.ApprovalWorkflow),
    (0, typeorm_1.JoinColumn)({ name: 'workflow_id' }),
    __metadata("design:type", approval_workflow_entity_1.ApprovalWorkflow)
], ApprovalRequest.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_id', type: 'uuid' }),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_label', nullable: true }),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "entityLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requester_id', type: 'uuid' }),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "requesterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_step', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ApprovalRequest.prototype, "currentStep", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], ApprovalRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ApprovalRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ApprovalRequest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], ApprovalRequest.prototype, "completedAt", void 0);
exports.ApprovalRequest = ApprovalRequest = __decorate([
    (0, typeorm_1.Entity)('approval_requests')
], ApprovalRequest);
//# sourceMappingURL=approval-request.entity.js.map