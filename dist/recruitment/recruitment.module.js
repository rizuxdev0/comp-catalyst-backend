"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_posting_entity_1 = require("./entities/job-posting.entity");
const job_application_entity_1 = require("./entities/job-application.entity");
const talent_pool_entity_1 = require("./entities/talent-pool.entity");
const candidate_evaluation_entity_1 = require("./entities/candidate-evaluation.entity");
const interview_entity_1 = require("./entities/interview.entity");
const recruitment_service_1 = require("./recruitment.service");
const recruitment_controller_1 = require("./recruitment.controller");
const interviews_service_1 = require("./interviews.service");
const interviews_controller_1 = require("./interviews.controller");
let RecruitmentModule = class RecruitmentModule {
};
exports.RecruitmentModule = RecruitmentModule;
exports.RecruitmentModule = RecruitmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                job_posting_entity_1.JobPosting, job_application_entity_1.JobApplication, talent_pool_entity_1.TalentPool, candidate_evaluation_entity_1.CandidateEvaluation, interview_entity_1.Interview
            ])],
        controllers: [recruitment_controller_1.RecruitmentController, interviews_controller_1.InterviewsController],
        providers: [recruitment_service_1.RecruitmentService, interviews_service_1.InterviewsService],
        exports: [recruitment_service_1.RecruitmentService, interviews_service_1.InterviewsService],
    })
], RecruitmentModule);
//# sourceMappingURL=recruitment.module.js.map