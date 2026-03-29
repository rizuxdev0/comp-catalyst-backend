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
exports.MedicalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medical_assistance_entity_1 = require("./entities/medical-assistance.entity");
let MedicalService = class MedicalService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id }, relations: ['employee'] });
        if (!item)
            throw new common_1.NotFoundException('Assistance médicale non trouvée');
        return item;
    }
    findByEmployee(employeeId) {
        return this.repo.find({
            where: { employee_id: employeeId },
            order: { created_at: 'DESC' },
        });
    }
    create(data) {
        const item = this.repo.create(data);
        return this.repo.save(item);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async approve(id, approverId, amountApproved) {
        await this.repo.update(id, {
            status: 'approved',
            approved_by: approverId,
            approved_at: new Date(),
            amount_approved: amountApproved,
        });
        return this.findOne(id);
    }
    async reject(id, reason) {
        await this.repo.update(id, { status: 'rejected', rejection_reason: reason });
        return this.findOne(id);
    }
};
exports.MedicalService = MedicalService;
exports.MedicalService = MedicalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medical_assistance_entity_1.MedicalAssistance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicalService);
//# sourceMappingURL=medical.service.js.map