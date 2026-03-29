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
exports.LeavesListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const leaves_service_1 = require("./leaves.service");
let LeavesListener = class LeavesListener {
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async handleApprovalCompleted(payload) {
        if (payload.module === 'leaves') {
            console.log(`Approval completed for leave request ${payload.entityId}`);
            await this.leavesService.approveRequest(payload.entityId, payload.userId);
        }
    }
    async handleApprovalRejected(payload) {
        if (payload.module === 'leaves') {
            console.log(`Approval rejected for leave request ${payload.entityId}`);
            await this.leavesService.rejectRequest(payload.entityId, 'Rejeté par le workflow d\'approbation');
        }
    }
};
exports.LeavesListener = LeavesListener;
__decorate([
    (0, event_emitter_1.OnEvent)('approval.completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesListener.prototype, "handleApprovalCompleted", null);
__decorate([
    (0, event_emitter_1.OnEvent)('approval.rejected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesListener.prototype, "handleApprovalRejected", null);
exports.LeavesListener = LeavesListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesListener);
//# sourceMappingURL=leaves.listener.js.map