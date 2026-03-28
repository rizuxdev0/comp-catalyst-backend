import { Repository } from 'typeorm';
import { HRTicket, TicketMessage, HRFAQ } from './entities/hr-ticket.entity';
export declare class HRTicketsService {
    private ticketsRepo;
    private messagesRepo;
    private faqRepo;
    constructor(ticketsRepo: Repository<HRTicket>, messagesRepo: Repository<TicketMessage>, faqRepo: Repository<HRFAQ>);
    findAllTickets(): Promise<HRTicket[]>;
    createTicket(data: Partial<HRTicket>): Promise<HRTicket>;
    updateTicket(id: string, data: Partial<HRTicket>): Promise<HRTicket>;
    findMessages(ticket_id: string): Promise<TicketMessage[]>;
    createMessage(ticket_id: string, data: Partial<TicketMessage>): Promise<TicketMessage>;
    findAllFaq(): Promise<HRFAQ[]>;
    createFaq(data: Partial<HRFAQ>): Promise<HRFAQ>;
    incrementFaqViews(id: string): Promise<{
        success: boolean;
    }>;
}
