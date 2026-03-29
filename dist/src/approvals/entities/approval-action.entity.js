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
exports.ApprovalAction = void 0;
const typeorm_1 = require("typeorm");
const approval_request_entity_1 = require("./approval-request.entity");
let ApprovalAction = class ApprovalAction {
};
exports.ApprovalAction = ApprovalAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_id', type: 'uuid' }),
    __metadata("design:type", String)
], ApprovalAction.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_request_entity_1.ApprovalRequest),
    (0, typeorm_1.JoinColumn)({ name: 'request_id' }),
    __metadata("design:type", approval_request_entity_1.ApprovalRequest)
], ApprovalAction.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'step_order', type: 'int' }),
    __metadata("design:type", Number)
], ApprovalAction.prototype, "stepOrder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalAction.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApprovalAction.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acted_by', type: 'uuid' }),
    __metadata("design:type", String)
], ApprovalAction.prototype, "actedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'acted_at' }),
    __metadata("design:type", Date)
], ApprovalAction.prototype, "actedAt", void 0);
exports.ApprovalAction = ApprovalAction = __decorate([
    (0, typeorm_1.Entity)('approval_actions')
], ApprovalAction);
//# sourceMappingURL=approval-action.entity.js.map