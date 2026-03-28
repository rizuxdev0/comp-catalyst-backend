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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateEvaluation = void 0;
const typeorm_1 = require("typeorm");
const job_application_entity_1 = require("./job-application.entity");
let CandidateEvaluation = class CandidateEvaluation {
};
exports.CandidateEvaluation = CandidateEvaluation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_application_entity_1.JobApplication),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", job_application_entity_1.JobApplication)
], CandidateEvaluation.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evaluator_name' }),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "evaluatorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evaluator_email', nullable: true }),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "evaluatorEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CandidateEvaluation.prototype, "criteria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overall_score', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], CandidateEvaluation.prototype, "overallScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overall_comment', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "overallComment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CandidateEvaluation.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'evaluated_at' }),
    __metadata("design:type", Date)
], CandidateEvaluation.prototype, "evaluatedAt", void 0);
exports.CandidateEvaluation = CandidateEvaluation = __decorate([
    (0, typeorm_1.Entity)('candidate_evaluations')
], CandidateEvaluation);
//# sourceMappingURL=candidate-evaluation.entity.js.map