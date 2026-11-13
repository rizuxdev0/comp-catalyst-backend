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
exports.EmployeeSurveysController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const employee_surveys_service_1 = require("./employee-surveys.service");
let EmployeeSurveysController = class EmployeeSurveysController {
    constructor(svc) {
        this.svc = svc;
    }
    getSurveys() { return this.svc.findAllSurveys(); }
    createSurvey(data) { return this.svc.createSurvey(data); }
    updateSurvey(id, data) { return this.svc.updateSurvey(id, data); }
    getSuggestions() { return this.svc.findAllSuggestions(); }
    createSuggestion(data) { return this.svc.createSuggestion(data); }
    updateSuggestion(id, data) { return this.svc.updateSuggestion(id, data); }
    vote(data, req) {
        const userId = data.user_id || req.user.id || req.user.userId;
        return this.svc.voteOnSuggestion(data.suggestion_id, userId, data.vote_type);
    }
    getResponses() { return this.svc.findAllResponses(); }
    createResponse(data) { return this.svc.createResponse(data); }
};
exports.EmployeeSurveysController = EmployeeSurveysController;
__decorate([
    (0, common_1.Get)('employee-surveys'),
    (0, swagger_1.ApiOperation)({ summary: 'List employee surveys' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "getSurveys", null);
__decorate([
    (0, common_1.Post)('employee-surveys'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "createSurvey", null);
__decorate([
    (0, common_1.Patch)('employee-surveys/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "updateSurvey", null);
__decorate([
    (0, common_1.Get)('suggestion-box'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "getSuggestions", null);
__decorate([
    (0, common_1.Post)('suggestion-box'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "createSuggestion", null);
__decorate([
    (0, common_1.Patch)('suggestion-box/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "updateSuggestion", null);
__decorate([
    (0, common_1.Post)('suggestion-votes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "vote", null);
__decorate([
    (0, common_1.Get)('survey-responses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "getResponses", null);
__decorate([
    (0, common_1.Post)('survey-responses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeSurveysController.prototype, "createResponse", null);
exports.EmployeeSurveysController = EmployeeSurveysController = __decorate([
    (0, swagger_1.ApiTags)('employee-surveys'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_surveys_service_1.EmployeeSurveysService])
], EmployeeSurveysController);
//# sourceMappingURL=employee-surveys.controller.js.map