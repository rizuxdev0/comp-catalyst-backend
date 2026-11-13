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
exports.TalentPool = void 0;
const typeorm_1 = require("typeorm");
let TalentPool = class TalentPool {
};
exports.TalentPool = TalentPool;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TalentPool.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_name' }),
    __metadata("design:type", String)
], TalentPool.prototype, "candidateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_email' }),
    __metadata("design:type", String)
], TalentPool.prototype, "candidateEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_phone', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "candidatePhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TalentPool.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'experience_years', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TalentPool.prototype, "experienceYears", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_position', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "currentPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'desired_position', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "desiredPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_expectation', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "salaryExpectation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TalentPool.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 3 }),
    __metadata("design:type", Number)
], TalentPool.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_available', default: true }),
    __metadata("design:type", Boolean)
], TalentPool.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cv_url', nullable: true }),
    __metadata("design:type", String)
], TalentPool.prototype, "cvUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TalentPool.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TalentPool.prototype, "updatedAt", void 0);
exports.TalentPool = TalentPool = __decorate([
    (0, typeorm_1.Entity)('talent_pool')
], TalentPool);
//# sourceMappingURL=talent-pool.entity.js.map