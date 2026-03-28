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
exports.TrainingsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const trainings_service_1 = require("./trainings.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
const swagger_1 = require("@nestjs/swagger");
let TrainingsController = class TrainingsController {
    constructor(trainingsService) {
        this.trainingsService = trainingsService;
    }
    async getTrainings() {
        return this.trainingsService.findAllTrainings();
    }
    async createTraining(data) {
        return this.trainingsService.createTraining(data);
    }
    async updateTraining(id, data) {
        return this.trainingsService.updateTraining(id, data);
    }
    async getEnrollments() {
        return this.trainingsService.findAllEnrollments();
    }
    async enrollEmployees(id, employeeIds) {
        return this.trainingsService.enrollEmployees(id, employeeIds);
    }
    async completeEnrollment(id, certificationUrl) {
        return this.trainingsService.completeEnrollment(id, certificationUrl);
    }
    async cancelEnrollment(id) {
        return this.trainingsService.cancelEnrollment(id);
    }
    async getBudgets() {
        return this.trainingsService.findBudgets();
    }
};
exports.TrainingsController = TrainingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all company trainings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "getTrainings", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new training program' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "createTraining", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update training details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "updateTraining", null);
__decorate([
    (0, common_1.Get)('enrollments'),
    (0, swagger_1.ApiOperation)({ summary: 'List all training enrollments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "getEnrollments", null);
__decorate([
    (0, common_1.Post)(':id/enroll'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Enroll employees in a training' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('employeeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "enrollEmployees", null);
__decorate([
    (0, common_1.Patch)('enrollments/:id/complete'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Mark an enrollment as completed' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('certificationUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "completeEnrollment", null);
__decorate([
    (0, common_1.Delete)('enrollments/:id'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel an enrollment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "cancelEnrollment", null);
__decorate([
    (0, common_1.Get)('budgets'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all training budgets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingsController.prototype, "getBudgets", null);
exports.TrainingsController = TrainingsController = __decorate([
    (0, swagger_1.ApiTags)('Trainings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('trainings'),
    __metadata("design:paramtypes", [trainings_service_1.TrainingsService])
], TrainingsController);
//# sourceMappingURL=trainings.controller.js.map