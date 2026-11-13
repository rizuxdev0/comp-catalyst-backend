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
exports.JobPosting = exports.RecruitmentStatus = void 0;
const typeorm_1 = require("typeorm");
const job_application_entity_1 = require("./job-application.entity");
var RecruitmentStatus;
(function (RecruitmentStatus) {
    RecruitmentStatus["OPEN"] = "open";
    RecruitmentStatus["IN_PROGRESS"] = "in_progress";
    RecruitmentStatus["CLOSED"] = "closed";
    RecruitmentStatus["CANCELLED"] = "cancelled";
})(RecruitmentStatus || (exports.RecruitmentStatus = RecruitmentStatus = {}));
let JobPosting = class JobPosting {
};
exports.JobPosting = JobPosting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobPosting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPosting.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPosting.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_range', nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "salaryRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_type', nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RecruitmentStatus,
        default: RecruitmentStatus.OPEN,
    }),
    __metadata("design:type", String)
], JobPosting.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_application_entity_1.JobApplication, (application) => application.jobPosting),
    __metadata("design:type", Array)
], JobPosting.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobPosting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JobPosting.prototype, "updatedAt", void 0);
exports.JobPosting = JobPosting = __decorate([
    (0, typeorm_1.Entity)('job_postings')
], JobPosting);
//# sourceMappingURL=job-posting.entity.js.map