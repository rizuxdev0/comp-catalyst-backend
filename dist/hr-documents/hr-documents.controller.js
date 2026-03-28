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
exports.HrDocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const hr_documents_service_1 = require("./hr-documents.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let HrDocumentsController = class HrDocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async create(createDto) {
        return this.documentsService.create(createDto);
    }
    async findAll(employeeId) {
        return this.documentsService.findAll(employeeId);
    }
    async findOne(id) {
        return this.documentsService.findOne(id);
    }
    async update(id, updateData) {
        return this.documentsService.update(id, updateData);
    }
    async remove(id) {
        return this.documentsService.remove(id);
    }
    async getSignatures(id) {
        return this.documentsService.fetchSignatures(id);
    }
    async addSignature(data) {
        return this.documentsService.addSignature(data);
    }
    async sign(id) {
        return this.documentsService.markAsSigned(id);
    }
};
exports.HrDocumentsController = HrDocumentsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a document reference' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get documents (all or filter by employee)' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a document by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a document' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a document' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/signatures'),
    (0, swagger_1.ApiOperation)({ summary: 'Get signatures for a document' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "getSignatures", null);
__decorate([
    (0, common_1.Post)('signatures'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a electronic signature' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "addSignature", null);
__decorate([
    (0, common_1.Patch)(':id/sign'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a document as signed' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HrDocumentsController.prototype, "sign", null);
exports.HrDocumentsController = HrDocumentsController = __decorate([
    (0, swagger_1.ApiTags)('HR Documents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('hr-documents'),
    __metadata("design:paramtypes", [hr_documents_service_1.HrDocumentsService])
], HrDocumentsController);
//# sourceMappingURL=hr-documents.controller.js.map