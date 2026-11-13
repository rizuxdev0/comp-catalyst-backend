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
exports.StaffDelegatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_delegate_entity_1 = require("./entities/staff-delegate.entity");
const employee_update_request_entity_1 = require("./entities/employee-update-request.entity");
let StaffDelegatesService = class StaffDelegatesService {
    constructor(delegatesRepo, settingsRepo, updateRequestsRepo) {
        this.delegatesRepo = delegatesRepo;
        this.settingsRepo = settingsRepo;
        this.updateRequestsRepo = updateRequestsRepo;
    }
    findAllDelegates() { return this.delegatesRepo.find({ order: { mandate_start_date: 'DESC' } }); }
    createDelegate(data) { return this.delegatesRepo.save(this.delegatesRepo.create(data)); }
    async updateDelegate(id, data) {
        await this.delegatesRepo.update(id, data);
        return this.delegatesRepo.findOneBy({ id });
    }
    findAllDelegateSettings() { return this.settingsRepo.find(); }
    createOrUpdateDelegateSetting(data) {
        return this.settingsRepo.save(this.settingsRepo.create(data));
    }
    findAllUpdateRequests() { return this.updateRequestsRepo.find({ order: { created_at: 'DESC' } }); }
    createUpdateRequest(data) { return this.updateRequestsRepo.save(this.updateRequestsRepo.create(data)); }
    async updateUpdateRequest(id, data) {
        await this.updateRequestsRepo.update(id, data);
        return this.updateRequestsRepo.findOneBy({ id });
    }
};
exports.StaffDelegatesService = StaffDelegatesService;
exports.StaffDelegatesService = StaffDelegatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_delegate_entity_1.StaffDelegate)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_delegate_entity_1.DelegateSetting)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_update_request_entity_1.EmployeeUpdateRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StaffDelegatesService);
//# sourceMappingURL=staff-delegates.service.js.map