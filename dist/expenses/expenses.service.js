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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_claim_entity_1 = require("./entities/expense-claim.entity");
let ExpensesService = class ExpensesService {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async findAll() {
        return this.expenseRepository.find({ order: { createdAt: 'DESC' }, relations: ['employee'] });
    }
    async findOne(id) {
        const claim = await this.expenseRepository.findOne({ where: { id }, relations: ['employee'] });
        if (!claim)
            throw new common_1.NotFoundException('Expense claim not found');
        return claim;
    }
    async create(data) {
        const claim = this.expenseRepository.create(data);
        return this.expenseRepository.save(claim);
    }
    async update(id, data) {
        await this.expenseRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.expenseRepository.delete(id);
    }
    async findByEmployee(employeeId) {
        return this.expenseRepository.find({ where: { employeeId }, order: { createdAt: 'DESC' } });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_claim_entity_1.ExpenseClaim)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map