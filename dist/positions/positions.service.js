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
exports.PositionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const position_entity_1 = require("./entities/position.entity");
let PositionsService = class PositionsService {
    constructor(positionsRepository) {
        this.positionsRepository = positionsRepository;
    }
    async findAll() {
        return this.positionsRepository.find({ order: { title: 'ASC' } });
    }
    async findOne(id) {
        const position = await this.positionsRepository.findOneBy({ id });
        if (!position)
            throw new common_1.NotFoundException('Poste non trouvé');
        return position;
    }
    async findByTitle(title) {
        return this.positionsRepository.findOneBy({ title });
    }
    async create(data) {
        const existing = await this.findByTitle(data.title);
        if (existing)
            throw new common_1.ConflictException('Ce poste existe déjà');
        const position = this.positionsRepository.create(data);
        return this.positionsRepository.save(position);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.positionsRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const position = await this.findOne(id);
        return this.positionsRepository.remove(position);
    }
};
exports.PositionsService = PositionsService;
exports.PositionsService = PositionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PositionsService);
//# sourceMappingURL=positions.service.js.map