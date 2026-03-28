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
exports.TrainingCatalogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const training_catalog_service_1 = require("./training-catalog.service");
let TrainingCatalogController = class TrainingCatalogController {
    constructor(svc) {
        this.svc = svc;
    }
    getCatalog() { return this.svc.findAllCatalog(); }
    createCatalog(data) { return this.svc.createCatalog(data); }
    updateCatalog(id, data) { return this.svc.updateCatalog(id, data); }
    deleteCatalog(id) { return this.svc.deleteCatalog(id); }
    getSkills() { return this.svc.findAllSkills(); }
    createSkill(data) { return this.svc.createSkill(data); }
    updateSkill(id, data) { return this.svc.updateSkill(id, data); }
    deleteSkill(id) { return this.svc.deleteSkill(id); }
    getCertifications() { return this.svc.findAllCertifications(); }
    createCertification(data) { return this.svc.createCertification(data); }
    updateCertification(id, data) { return this.svc.updateCertification(id, data); }
    deleteCertification(id) { return this.svc.deleteCertification(id); }
    getEmployeeSkills() { return this.svc.findAllEmployeeSkills(); }
    createEmployeeSkill(data) { return this.svc.createEmployeeSkill(data); }
    getEmployeeCertifications() { return this.svc.findAllEmployeeCertifications(); }
    createEmployeeCertification(data) { return this.svc.createEmployeeCertification(data); }
    getDevelopmentPlans() { return this.svc.findAllDevelopmentPlans(); }
    createDevelopmentPlan(data) { return this.svc.createDevelopmentPlan(data); }
    getTrainingEvaluations() { return this.svc.findAllTrainingEvaluations(); }
    createTrainingEvaluation(data) { return this.svc.createTrainingEvaluation(data); }
};
exports.TrainingCatalogController = TrainingCatalogController;
__decorate([
    (0, common_1.Get)('training-catalog'),
    (0, swagger_1.ApiOperation)({ summary: 'List training catalog' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getCatalog", null);
__decorate([
    (0, common_1.Post)('training-catalog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createCatalog", null);
__decorate([
    (0, common_1.Patch)('training-catalog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "updateCatalog", null);
__decorate([
    (0, common_1.Delete)('training-catalog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "deleteCatalog", null);
__decorate([
    (0, common_1.Get)('skills'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getSkills", null);
__decorate([
    (0, common_1.Post)('skills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createSkill", null);
__decorate([
    (0, common_1.Patch)('skills/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "updateSkill", null);
__decorate([
    (0, common_1.Delete)('skills/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "deleteSkill", null);
__decorate([
    (0, common_1.Get)('certifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getCertifications", null);
__decorate([
    (0, common_1.Post)('certifications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createCertification", null);
__decorate([
    (0, common_1.Patch)('certifications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "updateCertification", null);
__decorate([
    (0, common_1.Delete)('certifications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "deleteCertification", null);
__decorate([
    (0, common_1.Get)('employee-skills'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getEmployeeSkills", null);
__decorate([
    (0, common_1.Post)('employee-skills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createEmployeeSkill", null);
__decorate([
    (0, common_1.Get)('employee-certifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getEmployeeCertifications", null);
__decorate([
    (0, common_1.Post)('employee-certifications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createEmployeeCertification", null);
__decorate([
    (0, common_1.Get)('development-plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getDevelopmentPlans", null);
__decorate([
    (0, common_1.Post)('development-plans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createDevelopmentPlan", null);
__decorate([
    (0, common_1.Get)('training-evaluations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "getTrainingEvaluations", null);
__decorate([
    (0, common_1.Post)('training-evaluations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingCatalogController.prototype, "createTrainingEvaluation", null);
exports.TrainingCatalogController = TrainingCatalogController = __decorate([
    (0, swagger_1.ApiTags)('training-catalog'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [training_catalog_service_1.TrainingCatalogService])
], TrainingCatalogController);
//# sourceMappingURL=training-catalog.controller.js.map