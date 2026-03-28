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
exports.ApprovalsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const approvals_service_1 = require("./approvals.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let ApprovalsController = class ApprovalsController {
    constructor(approvalsService) {
        this.approvalsService = approvalsService;
    }
    async getWorkflows() {
        return this.approvalsService.findAllWorkflows();
    }
    async getSteps(id) {
        return this.approvalsService.findSteps(id);
    }
    async getRequests() {
        return this.approvalsService.findAllRequests();
    }
    async approveRequest(id, req, comment) {
        return this.approvalsService.approveRequest(id, req.user.id, comment);
    }
    async rejectRequest(id, req, comment) {
        return this.approvalsService.rejectRequest(id, req.user.id, comment);
    }
    async getActions(id) {
        return this.approvalsService.findActions(id);
    }
};
exports.ApprovalsController = ApprovalsController;
__decorate([
    (0, common_1.Get)('workflows'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active approval workflows' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getWorkflows", null);
__decorate([
    (0, common_1.Get)('workflows/:id/steps'),
    (0, swagger_1.ApiOperation)({ summary: 'Get steps for a specific workflow' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getSteps", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all approval requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getRequests", null);
__decorate([
    (0, common_1.Patch)('requests/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Patch)('requests/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Get)('requests/:id/actions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get actions history for a request' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getActions", null);
exports.ApprovalsController = ApprovalsController = __decorate([
    (0, swagger_1.ApiTags)('Approvals'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('approvals'),
    __metadata("design:paramtypes", [approvals_service_1.ApprovalsService])
], ApprovalsController);
//# sourceMappingURL=approvals.controller.js.map