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
exports.StaffDelegatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const staff_delegates_service_1 = require("./staff-delegates.service");
let StaffDelegatesController = class StaffDelegatesController {
    constructor(svc) {
        this.svc = svc;
    }
    getDelegates() { return this.svc.findAllDelegates(); }
    createDelegate(data) { return this.svc.createDelegate(data); }
    updateDelegate(id, data) { return this.svc.updateDelegate(id, data); }
    getDelegateSettings() { return this.svc.findAllDelegateSettings(); }
    upsertDelegateSetting(data) { return this.svc.createOrUpdateDelegateSetting(data); }
    getUpdateRequests() { return this.svc.findAllUpdateRequests(); }
    createUpdateRequest(data) { return this.svc.createUpdateRequest(data); }
    updateUpdateRequest(id, data) { return this.svc.updateUpdateRequest(id, data); }
};
exports.StaffDelegatesController = StaffDelegatesController;
__decorate([
    (0, common_1.Get)('staff-delegates'),
    (0, swagger_1.ApiOperation)({ summary: 'List staff delegates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "getDelegates", null);
__decorate([
    (0, common_1.Post)('staff-delegates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "createDelegate", null);
__decorate([
    (0, common_1.Patch)('staff-delegates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "updateDelegate", null);
__decorate([
    (0, common_1.Get)('delegate-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "getDelegateSettings", null);
__decorate([
    (0, common_1.Post)('delegate-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "upsertDelegateSetting", null);
__decorate([
    (0, common_1.Get)('employee-update-requests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "getUpdateRequests", null);
__decorate([
    (0, common_1.Post)('employee-update-requests'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "createUpdateRequest", null);
__decorate([
    (0, common_1.Patch)('employee-update-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StaffDelegatesController.prototype, "updateUpdateRequest", null);
exports.StaffDelegatesController = StaffDelegatesController = __decorate([
    (0, swagger_1.ApiTags)('staff-delegates-updates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [staff_delegates_service_1.StaffDelegatesService])
], StaffDelegatesController);
//# sourceMappingURL=staff-delegates.controller.js.map