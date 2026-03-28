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
exports.TrainingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const training_entity_1 = require("./entities/training.entity");
const training_enrollment_entity_1 = require("./entities/training-enrollment.entity");
const training_budget_entity_1 = require("./entities/training-budget.entity");
let TrainingsService = class TrainingsService {
    constructor(trainingRepository, enrollmentRepository, budgetRepository) {
        this.trainingRepository = trainingRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.budgetRepository = budgetRepository;
    }
    async findAllTrainings() {
        return this.trainingRepository.find({ order: { startDate: 'ASC' } });
    }
    async findOneTraining(id) {
        const training = await this.trainingRepository.findOne({ where: { id }, relations: ['enrollments'] });
        if (!training)
            throw new common_1.NotFoundException('Training not found');
        return training;
    }
    async createTraining(data) {
        const training = this.trainingRepository.create(data);
        return this.trainingRepository.save(training);
    }
    async updateTraining(id, data) {
        await this.trainingRepository.update(id, data);
        return this.findOneTraining(id);
    }
    async findAllEnrollments() {
        return this.enrollmentRepository.find({ order: { enrolledAt: 'DESC' }, relations: ['training', 'employee'] });
    }
    async enrollEmployees(trainingId, employeeIds) {
        const enrollments = employeeIds.map(employeeId => this.enrollmentRepository.create({
            trainingId,
            employeeId,
            status: 'enrolled',
            enrolledAt: new Date(),
        }));
        return this.enrollmentRepository.save(enrollments);
    }
    async completeEnrollment(id, certificationUrl) {
        await this.enrollmentRepository.update(id, {
            status: 'completed',
            completedAt: new Date(),
            certificationUrl,
        });
        return this.enrollmentRepository.findOne({ where: { id } });
    }
    async cancelEnrollment(id) {
        await this.enrollmentRepository.delete(id);
    }
    async findBudgets() {
        return this.budgetRepository.find({ order: { year: 'DESC' } });
    }
};
exports.TrainingsService = TrainingsService;
exports.TrainingsService = TrainingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_entity_1.Training)),
    __param(1, (0, typeorm_1.InjectRepository)(training_enrollment_entity_1.TrainingEnrollment)),
    __param(2, (0, typeorm_1.InjectRepository)(training_budget_entity_1.TrainingBudget)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TrainingsService);
//# sourceMappingURL=trainings.service.js.map