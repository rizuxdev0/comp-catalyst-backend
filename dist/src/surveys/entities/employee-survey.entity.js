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
exports.SurveyResponseEntity = exports.SuggestionVote = exports.SuggestionBoxItem = exports.EmployeeSurvey = void 0;
const typeorm_1 = require("typeorm");
let EmployeeSurvey = class EmployeeSurvey {
};
exports.EmployeeSurvey = EmployeeSurvey;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'survey' }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], EmployeeSurvey.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'draft' }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], EmployeeSurvey.prototype, "is_anonymous", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'all' }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "target_audience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "target_department_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeSurvey.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSurvey.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSurvey.prototype, "updated_at", void 0);
exports.EmployeeSurvey = EmployeeSurvey = __decorate([
    (0, typeorm_1.Entity)('employee_surveys')
], EmployeeSurvey);
let SuggestionBoxItem = class SuggestionBoxItem {
};
exports.SuggestionBoxItem = SuggestionBoxItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "employee_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'general' }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'pending' }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SuggestionBoxItem.prototype, "is_anonymous", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SuggestionBoxItem.prototype, "votes_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "admin_response", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SuggestionBoxItem.prototype, "responded_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SuggestionBoxItem.prototype, "responded_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SuggestionBoxItem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SuggestionBoxItem.prototype, "updated_at", void 0);
exports.SuggestionBoxItem = SuggestionBoxItem = __decorate([
    (0, typeorm_1.Entity)('suggestion_box')
], SuggestionBoxItem);
let SuggestionVote = class SuggestionVote {
};
exports.SuggestionVote = SuggestionVote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SuggestionVote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SuggestionVote.prototype, "suggestion_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SuggestionVote.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'up' }),
    __metadata("design:type", String)
], SuggestionVote.prototype, "vote_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SuggestionVote.prototype, "created_at", void 0);
exports.SuggestionVote = SuggestionVote = __decorate([
    (0, typeorm_1.Entity)('suggestion_votes')
], SuggestionVote);
let SurveyResponseEntity = class SurveyResponseEntity {
};
exports.SurveyResponseEntity = SurveyResponseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SurveyResponseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SurveyResponseEntity.prototype, "survey_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SurveyResponseEntity.prototype, "respondent_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], SurveyResponseEntity.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SurveyResponseEntity.prototype, "suggestion_text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SurveyResponseEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SurveyResponseEntity.prototype, "submitted_at", void 0);
exports.SurveyResponseEntity = SurveyResponseEntity = __decorate([
    (0, typeorm_1.Entity)('survey_responses')
], SurveyResponseEntity);
//# sourceMappingURL=employee-survey.entity.js.map