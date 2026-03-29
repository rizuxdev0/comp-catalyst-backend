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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const onboarding_service_1 = require("./onboarding.service");
let OnboardingController = class OnboardingController {
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAllChecklists();
    }
    findByEmployee(employeeId) {
        return this.service.findByEmployee(employeeId);
    }
    findOne(id) {
        return this.service.findChecklist(id);
    }
    createChecklist(data, req) {
        return this.service.createChecklist({ ...data, created_by: req.user.id });
    }
    updateChecklist(id, data) {
        return this.service.updateChecklist(id, data);
    }
    removeChecklist(id) {
        return this.service.removeChecklist(id);
    }
    findAllTasks(checklistId) {
        if (checklistId)
            return this.service.findTasksByChecklist(checklistId);
        return this.service.findAllTasks();
    }
    createTask(data) {
        return this.service.createTask(data);
    }
    findTasks(checklistId) {
        return this.service.findTasksByChecklist(checklistId);
    }
    createTaskInChecklist(checklistId, data) {
        return this.service.createTask({ ...data, checklist_id: checklistId });
    }
    updateTask(id, data) {
        return this.service.updateTask(id, data);
    }
    completeTask(id, req) {
        return this.service.completeTask(id, req.user.id);
    }
    removeTask(id) {
        return this.service.removeTask(id);
    }
    findAllEmployeeOnboarding(employeeId) {
        if (employeeId)
            return this.service.findByEmployee(employeeId);
        return this.service.findAllEmployeeOnboarding();
    }
    updateEmployeeOnboarding(id, data) {
        return this.service.updateTask(id, data);
    }
    startOnboarding(data) {
        return this.service.startOnboarding(data);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Get)('checklists'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister toutes les checklists d\'onboarding' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('checklists/employee/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Checklists d\'un employé' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'une checklist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('checklists'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une checklist d\'onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "createChecklist", null);
__decorate([
    (0, common_1.Patch)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier une checklist' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "updateChecklist", null);
__decorate([
    (0, common_1.Delete)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une checklist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "removeChecklist", null);
__decorate([
    (0, common_1.Get)('tasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister toutes les tâches (avec filtre optionnel checklistId)' }),
    __param(0, (0, common_1.Query)('checklistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findAllTasks", null);
__decorate([
    (0, common_1.Post)('tasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une tâche' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('checklists/:checklistId/tasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Tâches d\'une checklist' }),
    __param(0, (0, common_1.Param)('checklistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findTasks", null);
__decorate([
    (0, common_1.Post)('checklists/:checklistId/tasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter une tâche' }),
    __param(0, (0, common_1.Param)('checklistId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "createTaskInChecklist", null);
__decorate([
    (0, common_1.Patch)('tasks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier une tâche' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Post)('tasks/:id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Marquer une tâche comme terminée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "completeTask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une tâche' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "removeTask", null);
__decorate([
    (0, common_1.Get)('employee-onboarding'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les onboardings employé (filtre par employeeId)' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findAllEmployeeOnboarding", null);
__decorate([
    (0, common_1.Patch)('employee-onboarding/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour le statut d\'une tâche onboarding' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "updateEmployeeOnboarding", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: 'Démarrer l\'onboarding pour un employé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "startOnboarding", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, swagger_1.ApiTags)('Onboarding'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('onboarding'),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map