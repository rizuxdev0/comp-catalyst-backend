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
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const accounting_service_1 = require("./accounting.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let AccountingController = class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    async findAllMappings() {
        return this.accountingService.findAllMappings();
    }
    async createMapping(data) {
        return this.accountingService.createMapping(data);
    }
    async updateMapping(id, data) {
        return this.accountingService.updateMapping(id, data);
    }
    generateJournal(month, year, establishmentId) {
        return this.accountingService.generateJournalEntries(month, year, establishmentId);
    }
    getConsolidation(month, year) {
        return this.accountingService.getConsolidatedReport(month, year);
    }
    async export(res, month, year, format = 'generic', establishmentId) {
        const csv = await this.accountingService.exportToCSV(month, year, format, establishmentId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=OD_Paie_${year}_${month}.csv`);
        return res.send(csv);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('mappings'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all accounting mappings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "findAllMappings", null);
__decorate([
    (0, common_1.Post)('mappings'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create accounting mapping' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createMapping", null);
__decorate([
    (0, common_1.Patch)('mappings/:id'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update accounting mapping' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "updateMapping", null);
__decorate([
    (0, common_1.Get)('journal'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Génère les écritures comptables' }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('establishmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "generateJournal", null);
__decorate([
    (0, common_1.Get)('consolidation'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Rapport consolidé par établissement' }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getConsolidation", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Export CSV pour logiciel comptable' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('format')),
    __param(4, (0, common_1.Query)('establishmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "export", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('accounting'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('accounting'),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map