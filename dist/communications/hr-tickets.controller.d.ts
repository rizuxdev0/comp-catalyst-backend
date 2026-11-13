import { HRTicketsService } from './hr-tickets.service';
export declare class HRTicketsController {
    private readonly svc;
    constructor(svc: HRTicketsService);
    getTickets(): Promise<import("./entities/hr-ticket.entity").HRTicket[]>;
    createTicket(data: any): Promise<import("./entities/hr-ticket.entity").HRTicket>;
    updateTicket(id: string, data: any): Promise<import("./entities/hr-ticket.entity").HRTicket>;
    getMessages(id: string): Promise<import("./entities/hr-ticket.entity").TicketMessage[]>;
    createMessage(id: string, data: any): Promise<import("./entities/hr-ticket.entity").TicketMessage>;
    getFaqs(): Promise<import("./entities/hr-ticket.entity").HRFAQ[]>;
    createFaq(data: any): Promise<import("./entities/hr-ticket.entity").HRFAQ>;
    incrementFaqViews(id: string): Promise<{
        success: boolean;
    }>;
}
