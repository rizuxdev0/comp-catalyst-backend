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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const employees_service_1 = require("./employees.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
const hr_documents_service_1 = require("../hr-documents/hr-documents.service");
let EmployeesController = class EmployeesController {
    constructor(employeesService, hrDocumentsService) {
        this.employeesService = employeesService;
        this.hrDocumentsService = hrDocumentsService;
    }
    async findProfile(req) {
        return this.employeesService.findByUserId(req.user.id);
    }
    async create(createEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    }
    async findAll() {
        return this.employeesService.findAll();
    }
    async findOne(id) {
        return this.employeesService.findOne(id);
    }
    async update(id, updateData) {
        return this.employeesService.update(id, updateData);
    }
    async remove(id) {
        return this.employeesService.remove(id);
    }
    async findCareerHistory(id) {
        return this.employeesService['careerHistoryRepository'].find({
            where: { employeeId: id },
            order: { changeDate: 'DESC' },
        });
    }
    async addCareerHistory(id, data) {
        return this.employeesService['careerHistoryRepository'].save(this.employeesService['careerHistoryRepository'].create({
            ...data,
            employeeId: id,
        }));
    }
    async findDocuments(id) {
        return this.hrDocumentsService.findAll(id);
    }
    async addDocument(id, data) {
        return this.hrDocumentsService.create({ ...data, employeeId: id });
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user employee profile' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new employee' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all employees' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an employee by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an employee' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/career-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get career history for an employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findCareerHistory", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)(':id/career-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a career history record' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "addCareerHistory", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all HR documents for an employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findDocuments", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)(':id/documents'),
    (0, swagger_1.ApiOperation)({ summary: 'Add an HR document reference' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "addDocument", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)('employees'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService,
        hr_documents_service_1.HrDocumentsService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map