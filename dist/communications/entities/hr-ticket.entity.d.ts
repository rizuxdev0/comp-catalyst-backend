export declare class HRTicket {
    id: string;
    ticket_number: string;
    employee_id: string;
    user_id: string;
    category: string;
    subject: string;
    description: string;
    priority: string;
    status: string;
    assigned_to: string;
    resolution: string;
    resolved_at: Date;
    resolved_by: string;
    created_at: Date;
    updated_at: Date;
}
export declare class TicketMessage {
    id: string;
    ticket_id: string;
    sender_id: string;
    message: string;
    is_internal: boolean;
    created_at: Date;
}
export declare class HRFAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order_index: number;
    is_active: boolean;
    views: number;
    created_at: Date;
    updated_at: Date;
}
