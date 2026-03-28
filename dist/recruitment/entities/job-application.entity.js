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
exports.JobApplication = exports.ApplicationStatus = void 0;
const typeorm_1 = require("typeorm");
const job_posting_entity_1 = require("./job-posting.entity");
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["PENDING"] = "pending";
    ApplicationStatus["INTERVIEW"] = "interview";
    ApplicationStatus["OFFER"] = "offer";
    ApplicationStatus["HIRED"] = "hired";
    ApplicationStatus["REJECTED"] = "rejected";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
let JobApplication = class JobApplication {
};
exports.JobApplication = JobApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_posting_id', type: 'uuid' }),
    __metadata("design:type", String)
], JobApplication.prototype, "jobPostingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_posting_entity_1.JobPosting, posting => posting.applications),
    (0, typeorm_1.JoinColumn)({ name: 'job_posting_id' }),
    __metadata("design:type", job_posting_entity_1.JobPosting)
], JobApplication.prototype, "jobPosting", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_name' }),
    __metadata("design:type", String)
], JobApplication.prototype, "candidateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_email' }),
    __metadata("design:type", String)
], JobApplication.prototype, "candidateEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_phone', nullable: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "candidatePhone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING,
    }),
    __metadata("design:type", String)
], JobApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'interview_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JobApplication.prototype, "interviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], JobApplication.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cv_url', nullable: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "cvUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JobApplication.prototype, "updatedAt", void 0);
exports.JobApplication = JobApplication = __decorate([
    (0, typeorm_1.Entity)('job_applications')
], JobApplication);
//# sourceMappingURL=job-application.entity.js.map