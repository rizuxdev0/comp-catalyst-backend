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
exports.ContractsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const contracts_service_1 = require("./contracts.service");
const contract_entity_1 = require("./entities/contract.entity");
const contract_type_entity_1 = require("./entities/contract-type.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_entity_1 = require("../users/entities/user-role.entity");
let ContractsController = class ContractsController {
    constructor(contractsService) {
        this.contractsService = contractsService;
    }
    async create(createContractDto) {
        return this.contractsService.create(createContractDto);
    }
    async findAll(employeeId) {
        return this.contractsService.findAll(employeeId);
    }
    async findExpiring() {
        return this.contractsService.findExpiring();
    }
    async findOne(id) {
        return this.contractsService.findOne(id);
    }
    async update(id, updateData) {
        return this.contractsService.update(id, updateData);
    }
    async remove(id) {
        return this.contractsService.remove(id);
    }
    async findContractTypes() {
        return this.contractsService.findContractTypes();
    }
    async findContractType(id) {
        return this.contractsService.findContractType(id);
    }
    async createType(data) {
        return this.contractsService.createContractType(data);
    }
    async updateType(id, data) {
        return this.contractsService.updateContractType(id, data);
    }
    async removeType(id) {
        return this.contractsService.removeContractType(id);
    }
};
exports.ContractsController = ContractsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new contract' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The contract has been successfully created.', type: contract_entity_1.Contract }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contracts' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all contracts / filtered by employee.', type: [contract_entity_1.Contract] }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('expiring'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expiring active contracts within 30 days' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return expiring contracts.', type: [contract_entity_1.Contract] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findExpiring", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a contract by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single contract.', type: contract_entity_1.Contract }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN, user_role_entity_1.AppRole.MANAGER),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a contract' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The contract has been successfully updated.', type: contract_entity_1.Contract }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a contract' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'The contract has been successfully deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('types/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contract types' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [contract_type_entity_1.ContractType] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findContractTypes", null);
__decorate([
    (0, common_1.Get)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contract type by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: contract_type_entity_1.ContractType }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findContractType", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Post)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new contract type' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: contract_type_entity_1.ContractType }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "createType", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Patch)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a contract type' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: contract_type_entity_1.ContractType }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "updateType", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_entity_1.AppRole.ADMIN),
    (0, common_1.Delete)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a contract type' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "removeType", null);
exports.ContractsController = ContractsController = __decorate([
    (0, swagger_1.ApiTags)('contracts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService])
], ContractsController);
//# sourceMappingURL=contracts.controller.js.map