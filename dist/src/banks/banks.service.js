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
exports.BanksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bank_entity_1 = require("./entities/bank.entity");
let BanksService = class BanksService {
    constructor(banksRepository) {
        this.banksRepository = banksRepository;
    }
    findAll() {
        return this.banksRepository.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const bank = await this.banksRepository.findOneBy({ id });
        if (!bank)
            throw new common_1.NotFoundException('Bank not found');
        return bank;
    }
    async create(data) {
        const bank = this.banksRepository.create(data);
        return this.banksRepository.save(bank);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.banksRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.banksRepository.delete(id);
    }
    async setCompanyBank(id) {
        await this.banksRepository.update({}, { isCompanyBank: false });
        await this.banksRepository.update(id, { isCompanyBank: true });
        return this.findOne(id);
    }
};
exports.BanksService = BanksService;
exports.BanksService = BanksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bank_entity_1.Bank)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BanksService);
//# sourceMappingURL=banks.service.js.map