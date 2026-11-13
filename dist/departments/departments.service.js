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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const audit_service_1 = require("../audit/audit.service");
let DepartmentsService = class DepartmentsService {
    constructor(departmentRepository, auditService) {
        this.departmentRepository = departmentRepository;
        this.auditService = auditService;
    }
    async create(createDepartmentDto) {
        const department = this.departmentRepository.create(createDepartmentDto);
        const saved = await this.departmentRepository.save(department);
        await this.auditService.log({
            action: 'create',
            entityType: 'department',
            entityId: saved.id,
            entityName: saved.name || saved.id,
            newValues: createDepartmentDto,
        });
        return saved;
    }
    async findAll() {
        return this.departmentRepository
            .createQueryBuilder('department')
            .leftJoinAndSelect('department.manager', 'manager')
            .leftJoinAndSelect('department.parent', 'parent')
            .loadRelationCountAndMap('department.employeeCount', 'department.employees')
            .getMany();
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['manager', 'parent', 'children', 'employees'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async update(id, updateData) {
        const old = await this.findOne(id);
        await this.departmentRepository.update(id, updateData);
        await this.auditService.log({
            action: 'update',
            entityType: 'department',
            entityId: id,
            entityName: old.name || id,
            oldValues: old,
            newValues: updateData,
        });
        return this.findOne(id);
    }
    async remove(id) {
        const old = await this.findOne(id);
        await this.departmentRepository.delete(id);
        await this.auditService.log({
            action: 'delete',
            entityType: 'department',
            entityId: id,
            entityName: old.name || id,
        });
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map