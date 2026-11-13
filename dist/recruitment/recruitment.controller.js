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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const recruitment_service_1 = require("./recruitment.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let RecruitmentController = class RecruitmentController {
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    async findAllPostings() {
        return this.recruitmentService.findAllPostings();
    }
    async findOnePosting(id) {
        return this.recruitmentService.findOnePosting(id);
    }
    async createPosting(data) {
        return this.recruitmentService.createPosting(data);
    }
    async updatePosting(id, data) {
        return this.recruitmentService.updatePosting(id, data);
    }
    async removePosting(id) {
        return this.recruitmentService.removePosting(id);
    }
    async publishToJobBoards(id, platforms) {
        return this.recruitmentService.publishToJobBoards(id, platforms || ['LinkedIn', 'Indeed']);
    }
    async findAllApplications(postingId) {
        if (postingId)
            return this.recruitmentService.findApplicationsByPosting(postingId);
        return this.recruitmentService.findAllApplications();
    }
    async findOneApplication(id) {
        return this.recruitmentService.findOneApplication(id);
    }
    async createApplication(data) {
        return this.recruitmentService.createApplication(data);
    }
    async updateApplicationStatus(id, status, notes) {
        return this.recruitmentService.updateApplicationStatus(id, status, notes);
    }
    async sendApplicationEmail(id, subject, body) {
        return this.recruitmentService.sendApplicationEmail(id, subject, body);
    }
    async findAllTalent() {
        return this.recruitmentService.findAllTalent();
    }
    async findOneTalent(id) {
        return this.recruitmentService.findOneTalent(id);
    }
    async createTalent(data) {
        return this.recruitmentService.createTalent(data);
    }
    async updateTalent(id, data) {
        return this.recruitmentService.updateTalent(id, data);
    }
    async removeTalent(id) {
        return this.recruitmentService.removeTalent(id);
    }
    async findAllEvaluations() {
        return this.recruitmentService.findAllEvaluations();
    }
    async createEvaluation(data) {
        return this.recruitmentService.createEvaluation(data);
    }
    async analyzeCV(text, title) {
        return this.recruitmentService.analyzeCV(text, title);
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Get)('postings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job postings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findAllPostings", null);
__decorate([
    (0, common_1.Get)('postings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job posting by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findOnePosting", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('postings'),
    (0, swagger_1.ApiOperation)({ summary: 'Create job posting' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createPosting", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('postings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update job posting' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updatePosting", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('postings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete job posting' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "removePosting", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('postings/:id/publish'),
    (0, swagger_1.ApiOperation)({ summary: 'Publish job posting to job boards' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('platforms')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "publishToJobBoards", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job applications' }),
    __param(0, (0, common_1.Query)('postingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findAllApplications", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get application by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findOneApplication", null);
__decorate([
    (0, common_1.Post)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit job application' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createApplication", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('applications/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update job application status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('applications/:id/send-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Send automated email to candidate' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('subject')),
    __param(2, (0, common_1.Body)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "sendApplicationEmail", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('talent-pool'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all talent entries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findAllTalent", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('talent-pool/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get talent entry by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findOneTalent", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('talent-pool'),
    (0, swagger_1.ApiOperation)({ summary: 'Create talent entry' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createTalent", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)('talent-pool/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update talent entry' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateTalent", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('talent-pool/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete talent entry' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "removeTalent", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Get)('evaluations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all evaluations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findAllEvaluations", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('evaluations'),
    (0, swagger_1.ApiOperation)({ summary: 'Add candidate evaluation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createEvaluation", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)('analyze-cv'),
    (0, swagger_1.ApiOperation)({ summary: 'Analyze CV text using AI' }),
    __param(0, (0, common_1.Body)('cvText')),
    __param(1, (0, common_1.Body)('jobTitle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "analyzeCV", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, swagger_1.ApiTags)('recruitment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('recruitment'),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map