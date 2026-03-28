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
exports.AnnouncementsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const announcement_entity_1 = require("./entities/announcement.entity");
let AnnouncementsService = class AnnouncementsService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(activeOnly = true) {
        const query = this.repo.createQueryBuilder('a')
            .leftJoinAndSelect('a.author', 'author')
            .orderBy('a.isUrgent', 'DESC')
            .addOrderBy('a.createdAt', 'DESC');
        if (activeOnly) {
            query.where('a.isActive = :isActive', { isActive: true })
                .andWhere('(a.expiresAt IS NULL OR a.expiresAt > :now)', { now: new Date() });
        }
        return query.getMany();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ['author'] });
    }
    async create(data, author) {
        const ann = this.repo.create({ ...data, author });
        return this.repo.save(ann);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        return this.repo.delete(id);
    }
};
exports.AnnouncementsService = AnnouncementsService;
exports.AnnouncementsService = AnnouncementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(announcement_entity_1.Announcement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnnouncementsService);
//# sourceMappingURL=announcements.service.js.map