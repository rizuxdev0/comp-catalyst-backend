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
exports.TrashService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trash_bin_entity_1 = require("./entities/trash-bin.entity");
let TrashService = class TrashService {
    constructor(trashRepo) {
        this.trashRepo = trashRepo;
    }
    findAll() { return this.trashRepo.find({ where: { permanently_deleted: false }, order: { deleted_at: 'DESC' } }); }
    create(data) { return this.trashRepo.save(this.trashRepo.create(data)); }
    async update(id, data) {
        await this.trashRepo.update(id, data);
        return this.trashRepo.findOneBy({ id });
    }
    delete(id) { return this.trashRepo.delete(id); }
};
exports.TrashService = TrashService;
exports.TrashService = TrashService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trash_bin_entity_1.TrashBinItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrashService);
//# sourceMappingURL=trash.service.js.map