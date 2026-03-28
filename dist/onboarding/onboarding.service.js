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
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const onboarding_entity_1 = require("./entities/onboarding.entity");
let OnboardingService = class OnboardingService {
    constructor(checklistRepo, taskRepo) {
        this.checklistRepo = checklistRepo;
        this.taskRepo = taskRepo;
    }
    findAllChecklists() {
        return this.checklistRepo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
    }
    async findChecklist(id) {
        const item = await this.checklistRepo.findOne({ where: { id }, relations: ['employee'] });
        if (!item)
            throw new common_1.NotFoundException('Checklist non trouvée');
        return item;
    }
    findByEmployee(employeeId) {
        return this.checklistRepo.find({ where: { employee_id: employeeId }, relations: ['employee'] });
    }
    createChecklist(data) {
        return this.checklistRepo.save(this.checklistRepo.create(data));
    }
    async updateChecklist(id, data) {
        await this.checklistRepo.update(id, data);
        return this.findChecklist(id);
    }
    async removeChecklist(id) {
        await this.checklistRepo.delete(id);
    }
    findAllTasks() {
        return this.taskRepo.find({ order: { sort_order: 'ASC' } });
    }
    findTasksByChecklist(checklistId) {
        return this.taskRepo.find({
            where: { checklist_id: checklistId },
            order: { sort_order: 'ASC' },
        });
    }
    findAllEmployeeOnboarding() {
        return this.checklistRepo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
    }
    async startOnboarding(data) {
        const checklist = this.checklistRepo.create({
            employee_id: data.employee_id,
            title: data.title || 'Onboarding',
            status: 'in_progress',
            progress_percentage: 0,
        });
        return this.checklistRepo.save(checklist);
    }
    createTask(data) {
        return this.taskRepo.save(this.taskRepo.create(data));
    }
    async completeTask(id, userId) {
        await this.taskRepo.update(id, {
            is_completed: true,
            completed_at: new Date(),
            completed_by: userId,
        });
        const task = await this.taskRepo.findOne({ where: { id } });
        const allTasks = await this.taskRepo.find({ where: { checklist_id: task.checklist_id } });
        const done = allTasks.filter(t => t.is_completed).length;
        const progress = Math.round((done / allTasks.length) * 100);
        const checklistStatus = progress === 100 ? 'completed' : 'in_progress';
        await this.checklistRepo.update(task.checklist_id, {
            progress_percentage: progress,
            status: checklistStatus,
        });
        return task;
    }
    async updateTask(id, data) {
        await this.taskRepo.update(id, data);
        return this.taskRepo.findOne({ where: { id } });
    }
    async removeTask(id) {
        await this.taskRepo.delete(id);
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingChecklist)),
    __param(1, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map