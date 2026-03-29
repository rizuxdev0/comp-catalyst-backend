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
exports.TaxSalaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const tax_salary_service_1 = require("./tax-salary.service");
let TaxSalaryController = class TaxSalaryController {
    constructor(svc) {
        this.svc = svc;
    }
    getTaxSettings() { return this.svc.findAllTaxSettings(); }
    createTaxSetting(data) { return this.svc.createTaxSetting(data); }
    updateTaxSetting(id, data) { return this.svc.updateTaxSetting(id, data); }
    deleteTaxSetting(id) { return this.svc.deleteTaxSetting(id); }
    getSalaryGrid() { return this.svc.findAllSalaryGrid(); }
    createSalaryGrid(data) { return this.svc.createSalaryGrid(data); }
    updateSalaryGrid(id, data) { return this.svc.updateSalaryGrid(id, data); }
    deleteSalaryGrid(id) { return this.svc.deleteSalaryGrid(id); }
};
exports.TaxSalaryController = TaxSalaryController;
__decorate([
    (0, common_1.Get)('country-tax-settings'),
    (0, swagger_1.ApiOperation)({ summary: 'List tax settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "getTaxSettings", null);
__decorate([
    (0, common_1.Post)('country-tax-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "createTaxSetting", null);
__decorate([
    (0, common_1.Patch)('country-tax-settings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "updateTaxSetting", null);
__decorate([
    (0, common_1.Delete)('country-tax-settings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "deleteTaxSetting", null);
__decorate([
    (0, common_1.Get)('salary-grid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "getSalaryGrid", null);
__decorate([
    (0, common_1.Post)('salary-grid'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "createSalaryGrid", null);
__decorate([
    (0, common_1.Patch)('salary-grid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "updateSalaryGrid", null);
__decorate([
    (0, common_1.Delete)('salary-grid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxSalaryController.prototype, "deleteSalaryGrid", null);
exports.TaxSalaryController = TaxSalaryController = __decorate([
    (0, swagger_1.ApiTags)('tax-salary-settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tax_salary_service_1.TaxSalaryService])
], TaxSalaryController);
//# sourceMappingURL=tax-salary.controller.js.map