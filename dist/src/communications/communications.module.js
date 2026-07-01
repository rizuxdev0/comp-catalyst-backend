"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const communication_entity_1 = require("./entities/communication.entity");
const communication_delivery_entity_1 = require("./entities/communication-delivery.entity");
const hr_ticket_entity_1 = require("./entities/hr-ticket.entity");
const communications_service_1 = require("./communications.service");
const communications_controller_1 = require("./communications.controller");
const hr_tickets_service_1 = require("./hr-tickets.service");
const hr_tickets_controller_1 = require("./hr-tickets.controller");
const employee_entity_1 = require("../employees/entities/employee.entity");
let CommunicationsModule = class CommunicationsModule {
};
exports.CommunicationsModule = CommunicationsModule;
exports.CommunicationsModule = CommunicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                communication_entity_1.Communication,
                communication_delivery_entity_1.CommunicationDelivery,
                hr_ticket_entity_1.HRTicket,
                hr_ticket_entity_1.TicketMessage,
                hr_ticket_entity_1.HRFAQ,
                employee_entity_1.Employee
            ])],
        controllers: [communications_controller_1.CommunicationsController, hr_tickets_controller_1.HRTicketsController],
        providers: [communications_service_1.CommunicationsService, hr_tickets_service_1.HRTicketsService],
        exports: [communications_service_1.CommunicationsService, hr_tickets_service_1.HRTicketsService],
    })
], CommunicationsModule);
//# sourceMappingURL=communications.module.js.map