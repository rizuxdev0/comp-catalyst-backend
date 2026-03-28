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
exports.HolidaysController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const holidays_service_1 = require("./holidays.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
const swagger_1 = require("@nestjs/swagger");
let HolidaysController = class HolidaysController {
    constructor(holidaysService) {
        this.holidaysService = holidaysService;
    }
    async findAll(year) {
        if (year)
            return this.holidaysService.findByYear(year);
        return this.holidaysService.findAll();
    }
    async create(data) {
        return this.holidaysService.create(data);
    }
    async update(id, data) {
        return this.holidaysService.update(id, data);
    }
    async remove(id) {
        return this.holidaysService.remove(id);
    }
};
exports.HolidaysController = HolidaysController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all company holidays' }),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new organizational holiday' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update an organizational holiday' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an organizational holiday' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "remove", null);
exports.HolidaysController = HolidaysController = __decorate([
    (0, swagger_1.ApiTags)('Holidays'),
    (0, common_1.Controller)('holidays'),
    __metadata("design:paramtypes", [holidays_service_1.HolidaysService])
], HolidaysController);
//# sourceMappingURL=holidays.controller.js.map