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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let PermissionsController = class PermissionsController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findMyPermissions(req) {
        return this.usersService.getEffectivePermissions(req.user.id);
    }
    async findAll() {
        return this.usersService.findAllPermissions();
    }
    async findRolePermissions() {
        return this.usersService.getRolePermissionsMapping();
    }
    async toggleRolePermission(role, permissionId, granted) {
        return this.usersService.updateRolePermission(role, permissionId, granted);
    }
    async findUserExtraPermissions(userId) {
        return this.usersService.getUserExtraPermissions(userId);
    }
    async grantUserPermission(userId, permissionId, expiresAt) {
        return this.usersService.grantUserExtraPermission(userId, permissionId, expiresAt);
    }
    async revokeUserPermission(userId, permissionId) {
        return this.usersService.revokeUserExtraPermission(userId, permissionId);
    }
    async exportPermissions() {
        return this.usersService.exportRolePermissions();
    }
    async importPermissions(mapping) {
        return this.usersService.importRolePermissions(mapping);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user effective permissions' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findMyPermissions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all system permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get role permissions mapping' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findRolePermissions", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('roles/:role/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle permission for a role' }),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Param)('permissionId')),
    __param(2, (0, common_1.Body)('granted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "toggleRolePermission", null);
__decorate([
    (0, common_1.Get)('users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get extra permissions for a user' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findUserExtraPermissions", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Grant extra permission to a user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('permissionId')),
    __param(2, (0, common_1.Body)('expiresAt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "grantUserPermission", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('users/:userId/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke extra permission from a user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "revokeUserPermission", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export role permissions as JSON' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "exportPermissions", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('import'),
    (0, swagger_1.ApiOperation)({ summary: 'Import role permissions from JSON mapping' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "importPermissions", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)('permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map