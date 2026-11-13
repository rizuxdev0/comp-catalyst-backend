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
exports.SurveysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("./entities/survey.entity");
let SurveysService = class SurveysService {
    constructor(surveyRepo, responseRepo) {
        this.surveyRepo = surveyRepo;
        this.responseRepo = responseRepo;
    }
    findAll() {
        return this.surveyRepo.find({ order: { created_at: 'DESC' } });
    }
    async findOne(id) {
        const item = await this.surveyRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Sondage non trouvé');
        return item;
    }
    create(data) {
        return this.surveyRepo.save(this.surveyRepo.create(data));
    }
    async update(id, data) {
        await this.surveyRepo.update(id, data);
        return this.findOne(id);
    }
    async activate(id) {
        await this.surveyRepo.update(id, { status: 'active' });
        return this.findOne(id);
    }
    async close(id) {
        await this.surveyRepo.update(id, { status: 'closed' });
        return this.findOne(id);
    }
    async remove(id) {
        await this.surveyRepo.delete(id);
    }
    getResponses(surveyId) {
        return this.responseRepo.find({ where: { survey_id: surveyId } });
    }
    submitResponse(surveyId, data) {
        return this.responseRepo.save(this.responseRepo.create({ ...data, survey_id: surveyId }));
    }
    async getStats(surveyId) {
        const responses = await this.responseRepo.find({ where: { survey_id: surveyId } });
        const survey = await this.findOne(surveyId);
        return { survey, total_responses: responses.length, responses };
    }
};
exports.SurveysService = SurveysService;
exports.SurveysService = SurveysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(1, (0, typeorm_1.InjectRepository)(survey_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SurveysService);
//# sourceMappingURL=surveys.service.js.map