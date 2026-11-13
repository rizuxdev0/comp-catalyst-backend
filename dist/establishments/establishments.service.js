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
exports.EstablishmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const establishment_entity_1 = require("./entities/establishment.entity");
const company_settings_entity_1 = require("../settings/entities/company-settings.entity");
let EstablishmentService = class EstablishmentService {
    constructor(establishmentRepository, settingsRepository) {
        this.establishmentRepository = establishmentRepository;
        this.settingsRepository = settingsRepository;
    }
    async findAll() {
        return this.establishmentRepository.find({
            relations: ['company'],
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const establishment = await this.establishmentRepository.findOne({
            where: { id },
            relations: ['company'],
        });
        if (!establishment)
            throw new common_1.NotFoundException('Establishment not found');
        return establishment;
    }
    async create(data) {
        if (!data.company_id) {
            const settings = await this.settingsRepository.findOne({ where: {} });
            if (settings) {
                data.company_id = settings.id;
            }
        }
        const establishment = this.establishmentRepository.create(data);
        return this.establishmentRepository.save(establishment);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.establishmentRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const establishment = await this.findOne(id);
        await this.establishmentRepository.remove(establishment);
    }
};
exports.EstablishmentService = EstablishmentService;
exports.EstablishmentService = EstablishmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(establishment_entity_1.Establishment)),
    __param(1, (0, typeorm_1.InjectRepository)(company_settings_entity_1.CompanySettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EstablishmentService);
//# sourceMappingURL=establishments.service.js.map