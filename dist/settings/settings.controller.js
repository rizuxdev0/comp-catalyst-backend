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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const settings_service_1 = require("./settings.service");
const company_settings_entity_1 = require("./entities/company-settings.entity");
const collective_agreement_entity_1 = require("./entities/collective-agreement.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getSettings() {
        return this.settingsService.getSettings();
    }
    async updateSettings(updateData, req) {
        return this.settingsService.updateSettings(updateData, req.user);
    }
    async initialize(data) {
        return this.settingsService.initialize(data);
    }
    async getPasswordPolicy() {
        return this.settingsService.getPasswordPolicy();
    }
    async updatePasswordPolicy(id, data, req) {
        return this.settingsService.updatePasswordPolicy(id, data, req.user);
    }
    async getSmtpSettings() {
        return this.settingsService.getSmtpSettings();
    }
    async updateSmtpSettings(data, req) {
        return this.settingsService.updateSmtpSettings(data, req.user);
    }
    async testSmtp(data) {
        return this.settingsService.testSmtp(data);
    }
    async listContractTypes() {
        return this.settingsService.listContractTypes();
    }
    async createContractType(data) {
        return this.settingsService.createContractType(data);
    }
    async updateContractType(id, data, req) {
        return this.settingsService.updateContractType(id, data, req.user);
    }
    async deleteContractType(id) {
        return this.settingsService.deleteContractType(id);
    }
    async listCollectiveAgreements() {
        return this.settingsService.listCollectiveAgreements();
    }
    async saveCollectiveAgreement(data, req) {
        return this.settingsService.saveCollectiveAgreement(data, req.user);
    }
    async deleteCollectiveAgreement(id, req) {
        return this.settingsService.deleteCollectiveAgreement(id, req.user);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current company settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: company_settings_entity_1.CompanySettings }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update company settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: company_settings_entity_1.CompanySettings }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('initialize'),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize project with wizard data' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: company_settings_entity_1.CompanySettings }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "initialize", null);
__decorate([
    (0, common_1.Get)('password-policy'),
    (0, swagger_1.ApiOperation)({ summary: 'Get password policy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getPasswordPolicy", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('password-policy/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update password policy' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updatePasswordPolicy", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Get)('smtp'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SMTP settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getSmtpSettings", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('smtp'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SMTP settings' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateSmtpSettings", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('smtp/test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test SMTP connection' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "testSmtp", null);
__decorate([
    (0, common_1.Get)('contract-types'),
    (0, swagger_1.ApiOperation)({ summary: 'List contract types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "listContractTypes", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('contract-types'),
    (0, swagger_1.ApiOperation)({ summary: 'Create contract type' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createContractType", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('contract-types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update contract type' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateContractType", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('contract-types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete contract type' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deleteContractType", null);
__decorate([
    (0, common_1.Get)('collective-agreements'),
    (0, swagger_1.ApiOperation)({ summary: 'List collective agreements' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [collective_agreement_entity_1.CollectiveAgreement] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "listCollectiveAgreements", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('collective-agreements'),
    (0, swagger_1.ApiOperation)({ summary: 'Create/Update collective agreement' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "saveCollectiveAgreement", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('collective-agreements/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete collective agreement' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deleteCollectiveAgreement", null);
exports.SettingsController = SettingsController = __decorate([
    (0, swagger_1.ApiTags)('settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map