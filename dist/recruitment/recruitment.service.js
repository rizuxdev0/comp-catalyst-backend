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
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_posting_entity_1 = require("./entities/job-posting.entity");
const job_application_entity_1 = require("./entities/job-application.entity");
const talent_pool_entity_1 = require("./entities/talent-pool.entity");
const candidate_evaluation_entity_1 = require("./entities/candidate-evaluation.entity");
const eventemitter2_1 = require("eventemitter2");
let RecruitmentService = class RecruitmentService {
    constructor(postingRepository, applicationRepository, talentPoolRepository, evaluationRepository, eventEmitter) {
        this.postingRepository = postingRepository;
        this.applicationRepository = applicationRepository;
        this.talentPoolRepository = talentPoolRepository;
        this.evaluationRepository = evaluationRepository;
        this.eventEmitter = eventEmitter;
    }
    async findAllPostings() {
        return this.postingRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOnePosting(id) {
        const posting = await this.postingRepository.findOne({ where: { id }, relations: ['applications'] });
        if (!posting)
            throw new common_1.NotFoundException('Job posting not found');
        return posting;
    }
    async createPosting(data) {
        const posting = this.postingRepository.create(data);
        const saved = await this.postingRepository.save(posting);
        this.eventEmitter.emit('audit.log', {
            action: 'RECRUITMENT_POST_CREATE',
            entityType: 'job_posting',
            entityId: saved.id,
            entityName: saved.title,
            newValues: saved,
        });
        return saved;
    }
    async updatePosting(id, updates) {
        await this.findOnePosting(id);
        await this.postingRepository.update(id, updates);
        return this.findOnePosting(id);
    }
    async removePosting(id) {
        const posting = await this.findOnePosting(id);
        await this.postingRepository.delete(id);
        this.eventEmitter.emit('audit.log', {
            action: 'RECRUITMENT_POST_DELETE',
            entityType: 'job_posting',
            entityId: id,
            entityName: posting.title,
        });
    }
    async findAllApplications() {
        return this.applicationRepository.find({ relations: ['jobPosting'], order: { createdAt: 'DESC' } });
    }
    async findApplicationsByPosting(postingId) {
        return this.applicationRepository.find({ where: { jobPostingId: postingId }, order: { createdAt: 'DESC' } });
    }
    async findOneApplication(id) {
        const app = await this.applicationRepository.findOne({ where: { id }, relations: ['jobPosting'] });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        return app;
    }
    async createApplication(data) {
        const app = this.applicationRepository.create(data);
        const saved = await this.applicationRepository.save(app);
        return this.findOneApplication(saved.id);
    }
    async updateApplicationStatus(id, status, notes) {
        const app = await this.findOneApplication(id);
        await this.applicationRepository.update(id, { status, notes: notes || app.notes });
        const updated = await this.findOneApplication(id);
        this.eventEmitter.emit('notification.send', {
            recipientEmail: updated.candidateEmail,
            recipientName: updated.candidateName,
            type: `recruitment_${status}`,
            details: { jobTitle: updated.jobPosting.title },
        });
        return updated;
    }
    async findAllTalent() {
        return this.talentPoolRepository.find({ order: { rating: 'DESC' } });
    }
    async findOneTalent(id) {
        const entry = await this.talentPoolRepository.findOne({ where: { id } });
        if (!entry)
            throw new common_1.NotFoundException('Talent profile not found');
        return entry;
    }
    async createTalent(data) {
        const entry = this.talentPoolRepository.create(data);
        return this.talentPoolRepository.save(entry);
    }
    async updateTalent(id, updates) {
        await this.findOneTalent(id);
        await this.talentPoolRepository.update(id, updates);
        return this.findOneTalent(id);
    }
    async removeTalent(id) {
        await this.findOneTalent(id);
        await this.talentPoolRepository.delete(id);
    }
    async createEvaluation(data) {
        const evaluation = this.evaluationRepository.create(data);
        const saved = await this.evaluationRepository.save(evaluation);
        const appId = evaluation.applicationId;
        const evals = await this.evaluationRepository.find({ where: { applicationId: appId } });
        const avgScore = evals.reduce((sum, e) => sum + e.overallScore, 0) / evals.length;
        await this.applicationRepository.update(appId, { score: Math.round(avgScore * 10) / 10 });
        return saved;
    }
    async findAllEvaluations() {
        return this.evaluationRepository.find({ order: { evaluatedAt: 'DESC' } });
    }
    async analyzeCV(text, title) {
        await new Promise(r => setTimeout(r, 1500));
        const hasEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        const hasPhone = text.match(/(\+?[0-9\s.-]{8,})/gi);
        return {
            analysis: {
                candidate_name: 'Candidat Extrait',
                candidate_email: hasEmail ? hasEmail[0] : 'email@exemple.com',
                candidate_phone: hasPhone ? hasPhone[0] : '0600000000',
                current_position: 'Développeur Fullstack',
                experience_years: 5,
                skills: ['JavaScript', 'React', 'NestJS', 'TypeORM', 'PostgreSQL'],
                compatibility_score: 85,
                compatibility_details: {
                    strengths: ['Expérience pertinente', 'Compétences techniques alignées'],
                    gaps: ['Anglais à confirmer'],
                },
                profile_summary: 'Profil très prometteur correspondant aux critères de l\'offre.',
                recommended_tags: ['senior', 'remote', 'valeur sûre'],
                overall_rating: 4,
            }
        };
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_posting_entity_1.JobPosting)),
    __param(1, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __param(2, (0, typeorm_1.InjectRepository)(talent_pool_entity_1.TalentPool)),
    __param(3, (0, typeorm_1.InjectRepository)(candidate_evaluation_entity_1.CandidateEvaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        eventemitter2_1.EventEmitter2])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map