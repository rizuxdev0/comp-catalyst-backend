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
exports.CareerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const career_history_entity_1 = require("./entities/career-history.entity");
const audit_service_1 = require("../audit/audit.service");
let CareerService = class CareerService {
    constructor(repo, auditService) {
        this.repo = repo;
        this.auditService = auditService;
    }
    findByEmployee(employeeId) {
        return this.repo.find({
            where: { employee_id: employeeId },
            order: { effective_date: 'DESC' },
        });
    }
    findAll() {
        return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
        if (!item)
            throw new common_1.NotFoundException('Historique carrière non trouvé');
        return item;
    }
    async create(data) {
        const item = await this.repo.save(this.repo.create(data));
        await this.auditService.log({
            action: 'create',
            entityType: 'career',
            entityId: item.id,
            entityName: `${data.event_type || 'Action'} - ${data.new_job_title || ''}`,
            newValues: data,
        });
        return item;
    }
    async update(id, data) {
        const old = await this.findOne(id);
        await this.repo.update(id, data);
        await this.auditService.log({
            action: 'update',
            entityType: 'career',
            entityId: id,
            entityName: `Carrière ${old.employee_id || id}`,
            oldValues: old,
            newValues: data,
        });
        return this.findOne(id);
    }
    async remove(id) {
        const old = await this.findOne(id);
        await this.repo.delete(id);
        await this.auditService.log({
            action: 'delete',
            entityType: 'career',
            entityId: id,
            entityName: `Carrière ${old.employee_id || id}`,
        });
    }
};
exports.CareerService = CareerService;
exports.CareerService = CareerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(career_history_entity_1.CareerHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], CareerService);
//# sourceMappingURL=career.service.js.map