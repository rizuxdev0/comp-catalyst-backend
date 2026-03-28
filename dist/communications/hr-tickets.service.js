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
exports.HRTicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hr_ticket_entity_1 = require("./entities/hr-ticket.entity");
let HRTicketsService = class HRTicketsService {
    constructor(ticketsRepo, messagesRepo, faqRepo) {
        this.ticketsRepo = ticketsRepo;
        this.messagesRepo = messagesRepo;
        this.faqRepo = faqRepo;
    }
    findAllTickets() {
        return this.ticketsRepo.find({ order: { created_at: 'DESC' } });
    }
    createTicket(data) {
        if (!data.ticket_number) {
            const now = new Date();
            const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
            const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
            data.ticket_number = `TKT-${yearMonth}-${rand}`;
        }
        return this.ticketsRepo.save(this.ticketsRepo.create(data));
    }
    async updateTicket(id, data) {
        await this.ticketsRepo.update(id, data);
        return this.ticketsRepo.findOneBy({ id });
    }
    findMessages(ticket_id) {
        return this.messagesRepo.find({ where: { ticket_id }, order: { created_at: 'ASC' } });
    }
    createMessage(ticket_id, data) {
        return this.messagesRepo.save(this.messagesRepo.create({ ...data, ticket_id }));
    }
    findAllFaq() {
        return this.faqRepo.find({ order: { order_index: 'ASC' } });
    }
    createFaq(data) {
        return this.faqRepo.save(this.faqRepo.create(data));
    }
    async incrementFaqViews(id) {
        await this.faqRepo.increment({ id }, 'views', 1);
        return { success: true };
    }
};
exports.HRTicketsService = HRTicketsService;
exports.HRTicketsService = HRTicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hr_ticket_entity_1.HRTicket)),
    __param(1, (0, typeorm_1.InjectRepository)(hr_ticket_entity_1.TicketMessage)),
    __param(2, (0, typeorm_1.InjectRepository)(hr_ticket_entity_1.HRFAQ)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HRTicketsService);
//# sourceMappingURL=hr-tickets.service.js.map