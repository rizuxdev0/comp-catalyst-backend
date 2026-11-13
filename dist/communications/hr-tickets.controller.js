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
exports.HRTicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const hr_tickets_service_1 = require("./hr-tickets.service");
let HRTicketsController = class HRTicketsController {
    constructor(svc) {
        this.svc = svc;
    }
    getTickets() { return this.svc.findAllTickets(); }
    createTicket(data) { return this.svc.createTicket(data); }
    updateTicket(id, data) { return this.svc.updateTicket(id, data); }
    getMessages(id) { return this.svc.findMessages(id); }
    createMessage(id, data) { return this.svc.createMessage(id, data); }
    getFaqs() { return this.svc.findAllFaq(); }
    createFaq(data) { return this.svc.createFaq(data); }
    incrementFaqViews(id) { return this.svc.incrementFaqViews(id); }
};
exports.HRTicketsController = HRTicketsController;
__decorate([
    (0, common_1.Get)('hr-tickets'),
    (0, swagger_1.ApiOperation)({ summary: 'List HR tickets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Post)('hr-tickets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Patch)('hr-tickets/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Get)('hr-tickets/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('hr-tickets/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('hr-faq'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "getFaqs", null);
__decorate([
    (0, common_1.Post)('hr-faq'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "createFaq", null);
__decorate([
    (0, common_1.Post)('hr-faq/:id/increment-view'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HRTicketsController.prototype, "incrementFaqViews", null);
exports.HRTicketsController = HRTicketsController = __decorate([
    (0, swagger_1.ApiTags)('hr-tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [hr_tickets_service_1.HRTicketsService])
], HRTicketsController);
//# sourceMappingURL=hr-tickets.controller.js.map