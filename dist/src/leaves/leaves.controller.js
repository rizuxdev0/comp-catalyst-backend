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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const leaves_service_1 = require("./leaves.service");
const leave_request_entity_1 = require("./entities/leave-request.entity");
const leave_type_entity_1 = require("./entities/leave-type.entity");
const leave_balance_entity_1 = require("./entities/leave-balance.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../common/decorators/permissions.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let LeavesController = class LeavesController {
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async findAllTypes() {
        return this.leavesService.findAllTypes();
    }
    async createType(data) {
        return this.leavesService.createType(data);
    }
    async updateType(id, data) {
        return this.leavesService.updateType(id, data);
    }
    async deleteType(id) {
        return this.leavesService.deleteType(id);
    }
    async findMyRequests(req) {
        return this.leavesService.findMyRequests(req.user.id);
    }
    async findAllRequests(status) {
        return this.leavesService.findAllRequests(status);
    }
    async getMyBalances(req, year) {
        const currentYear = year || new Date().getFullYear();
        return this.leavesService.getBalances(req.user.id, currentYear);
    }
    async createRequest(req, data) {
        return this.leavesService.createRequest(req.user.id, data);
    }
    async approveRequest(id, req) {
        return this.leavesService.approveRequest(id, req.user.id);
    }
    async rejectRequest(id, reason) {
        return this.leavesService.rejectRequest(id, reason);
    }
    async cancelRequest(id, req) {
        return this.leavesService.cancelRequest(id, req.user.id);
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active leave types' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [leave_type_entity_1.LeaveType] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findAllTypes", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new leave type' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createType", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a leave type' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "updateType", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a leave type' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "deleteType", null);
__decorate([
    (0, common_1.Get)('my-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current employee leave requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [leave_request_entity_1.LeaveRequest] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findMyRequests", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all leave requests (for managers)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: leave_request_entity_1.LeaveRequestStatus, required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [leave_request_entity_1.LeaveRequest] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findAllRequests", null);
__decorate([
    (0, common_1.Get)('balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current employee leave balances' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [leave_balance_entity_1.LeaveBalance] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getMyBalances", null);
__decorate([
    (0, common_1.Post)('request'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new leave request' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: leave_request_entity_1.LeaveRequest }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createRequest", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, permissions_decorator_1.Permissions)('leaves.approve'),
    (0, common_1.Patch)('request/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a leave request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "approveRequest", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('request/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a leave request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Patch)('request/:id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel own leave request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "cancelRequest", null);
exports.LeavesController = LeavesController = __decorate([
    (0, swagger_1.ApiTags)('leaves'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('leaves'),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map