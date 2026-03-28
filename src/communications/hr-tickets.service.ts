import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HRTicket, TicketMessage, HRFAQ } from './entities/hr-ticket.entity';

@Injectable()
export class HRTicketsService {
  constructor(
    @InjectRepository(HRTicket) private ticketsRepo: Repository<HRTicket>,
    @InjectRepository(TicketMessage) private messagesRepo: Repository<TicketMessage>,
    @InjectRepository(HRFAQ) private faqRepo: Repository<HRFAQ>,
  ) {}

  // ======= TICKETS =======
  findAllTickets() {
    return this.ticketsRepo.find({ order: { created_at: 'DESC' } });
  }

  createTicket(data: Partial<HRTicket>) {
    if (!data.ticket_number) {
      const now = new Date();
      const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
      const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
      data.ticket_number = `TKT-${yearMonth}-${rand}`;
    }
    return this.ticketsRepo.save(this.ticketsRepo.create(data));
  }

  async updateTicket(id: string, data: Partial<HRTicket>) {
    await this.ticketsRepo.update(id, data);
    return this.ticketsRepo.findOneBy({ id });
  }

  // ======= MESSAGES =======
  findMessages(ticket_id: string) {
    return this.messagesRepo.find({ where: { ticket_id }, order: { created_at: 'ASC' } });
  }

  createMessage(ticket_id: string, data: Partial<TicketMessage>) {
    return this.messagesRepo.save(this.messagesRepo.create({ ...data, ticket_id }));
  }

  // ======= FAQ =======
  findAllFaq() {
    return this.faqRepo.find({ order: { order_index: 'ASC' } });
  }

  createFaq(data: Partial<HRFAQ>) {
    return this.faqRepo.save(this.faqRepo.create(data));
  }

  async incrementFaqViews(id: string) {
    await this.faqRepo.increment({ id }, 'views', 1);
    return { success: true };
  }
}
