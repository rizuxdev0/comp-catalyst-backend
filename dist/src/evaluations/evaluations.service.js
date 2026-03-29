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
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evaluation_entity_1 = require("./entities/evaluation.entity");
let EvaluationsService = class EvaluationsService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee', 'evaluator'] });
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id }, relations: ['employee', 'evaluator'] });
        if (!item)
            throw new common_1.NotFoundException('Évaluation non trouvée');
        return item;
    }
    findByEmployee(employeeId) {
        return this.repo.find({
            where: { employee_id: employeeId },
            order: { evaluation_date: 'DESC' },
            relations: ['evaluator'],
        });
    }
    create(data) {
        return this.repo.save(this.repo.create(data));
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async complete(id, rating) {
        await this.repo.update(id, {
            status: 'completed',
            overall_rating: rating,
            evaluation_date: new Date().toISOString().split('T')[0],
        });
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map