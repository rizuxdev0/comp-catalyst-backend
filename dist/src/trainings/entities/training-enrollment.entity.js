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
exports.TrainingEnrollment = void 0;
const typeorm_1 = require("typeorm");
const training_entity_1 = require("./training.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let TrainingEnrollment = class TrainingEnrollment {
};
exports.TrainingEnrollment = TrainingEnrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TrainingEnrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'training_id', type: 'uuid' }),
    __metadata("design:type", String)
], TrainingEnrollment.prototype, "trainingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => training_entity_1.Training, (training) => training.enrollments),
    (0, typeorm_1.JoinColumn)({ name: 'training_id' }),
    __metadata("design:type", training_entity_1.Training)
], TrainingEnrollment.prototype, "training", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], TrainingEnrollment.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], TrainingEnrollment.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'enrolled_at' }),
    __metadata("design:type", Date)
], TrainingEnrollment.prototype, "enrolledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], TrainingEnrollment.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_url', nullable: true }),
    __metadata("design:type", String)
], TrainingEnrollment.prototype, "certificationUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'enrolled' }),
    __metadata("design:type", String)
], TrainingEnrollment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TrainingEnrollment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TrainingEnrollment.prototype, "updatedAt", void 0);
exports.TrainingEnrollment = TrainingEnrollment = __decorate([
    (0, typeorm_1.Entity)('training_enrollments')
], TrainingEnrollment);
//# sourceMappingURL=training-enrollment.entity.js.map