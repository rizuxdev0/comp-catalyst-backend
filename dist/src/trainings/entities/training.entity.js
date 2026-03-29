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
exports.Training = void 0;
const typeorm_1 = require("typeorm");
const training_enrollment_entity_1 = require("./training-enrollment.entity");
let Training = class Training {
};
exports.Training = Training;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Training.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Training.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Training.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Training.prototype, "trainer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Training.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Training.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Training.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_participants', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Training.prototype, "maxParticipants", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'planned' }),
    __metadata("design:type", String)
], Training.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_enrollment_entity_1.TrainingEnrollment, (enrollment) => enrollment.training),
    __metadata("design:type", Array)
], Training.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Training.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Training.prototype, "updatedAt", void 0);
exports.Training = Training = __decorate([
    (0, typeorm_1.Entity)('trainings')
], Training);
//# sourceMappingURL=training.entity.js.map