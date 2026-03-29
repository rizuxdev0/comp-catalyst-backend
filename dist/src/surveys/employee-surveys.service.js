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
exports.EmployeeSurveysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_survey_entity_1 = require("./entities/employee-survey.entity");
let EmployeeSurveysService = class EmployeeSurveysService {
    constructor(surveyRepo, suggestionRepo, voteRepo, responseRepo) {
        this.surveyRepo = surveyRepo;
        this.suggestionRepo = suggestionRepo;
        this.voteRepo = voteRepo;
        this.responseRepo = responseRepo;
    }
    findAllSurveys() { return this.surveyRepo.find({ order: { created_at: 'DESC' } }); }
    createSurvey(data) { return this.surveyRepo.save(this.surveyRepo.create(data)); }
    async updateSurvey(id, data) {
        await this.surveyRepo.update(id, data);
        return this.surveyRepo.findOneBy({ id });
    }
    findAllSuggestions() { return this.suggestionRepo.find({ order: { votes_count: 'DESC' } }); }
    createSuggestion(data) { return this.suggestionRepo.save(this.suggestionRepo.create(data)); }
    async updateSuggestion(id, data) {
        await this.suggestionRepo.update(id, data);
        return this.suggestionRepo.findOneBy({ id });
    }
    async voteOnSuggestion(suggestion_id, user_id, vote_type) {
        const existing = await this.voteRepo.findOneBy({ suggestion_id, user_id });
        if (existing) {
            if (existing.vote_type === vote_type) {
                await this.voteRepo.delete(existing.id);
                const diff = vote_type === 'up' ? -1 : 1;
                await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
                return { message: 'Vote removed' };
            }
            else {
                await this.voteRepo.update(existing.id, { vote_type });
                const diff = vote_type === 'up' ? 2 : -2;
                await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
                return { message: 'Vote changed' };
            }
        }
        else {
            await this.voteRepo.save(this.voteRepo.create({ suggestion_id, user_id, vote_type }));
            const diff = vote_type === 'up' ? 1 : -1;
            await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
            return { message: 'Vote added' };
        }
    }
    findAllResponses() { return this.responseRepo.find(); }
    createResponse(data) { return this.responseRepo.save(this.responseRepo.create(data)); }
};
exports.EmployeeSurveysService = EmployeeSurveysService;
exports.EmployeeSurveysService = EmployeeSurveysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_survey_entity_1.EmployeeSurvey)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_survey_entity_1.SuggestionBoxItem)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_survey_entity_1.SuggestionVote)),
    __param(3, (0, typeorm_1.InjectRepository)(employee_survey_entity_1.SurveyResponseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeSurveysService);
//# sourceMappingURL=employee-surveys.service.js.map