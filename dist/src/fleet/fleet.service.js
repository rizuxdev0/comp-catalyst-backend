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
exports.FleetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let FleetService = class FleetService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async findAll() {
        return this.vehicleRepository.find({ relations: ['currentEmployee'] });
    }
    async findOne(id) {
        const v = await this.vehicleRepository.findOne({ where: { id }, relations: ['currentEmployee'] });
        if (!v)
            throw new common_1.NotFoundException('Vehicle not found');
        return v;
    }
    async create(data) {
        const v = this.vehicleRepository.create(data);
        return this.vehicleRepository.save(v);
    }
    async update(id, data) {
        await this.vehicleRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.vehicleRepository.delete(id);
    }
    async assignToEmployee(id, employeeId) {
        await this.vehicleRepository.update(id, {
            currentEmployeeId: employeeId,
            status: 'assigned',
            assignmentDate: new Date(),
        });
        return this.findOne(id);
    }
    async unassign(id) {
        await this.vehicleRepository.update(id, {
            currentEmployeeId: null,
            status: 'available',
            assignmentDate: null,
        });
        return this.findOne(id);
    }
};
exports.FleetService = FleetService;
exports.FleetService = FleetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FleetService);
//# sourceMappingURL=fleet.service.js.map