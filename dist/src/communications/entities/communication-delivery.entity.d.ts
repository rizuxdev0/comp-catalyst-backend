import { Communication } from './communication.entity';
export declare class CommunicationDelivery {
    id: string;
    communication_id: string;
    communication: Communication;
    employee_id: string;
    email_address: string;
    email_type: string;
    status: string;
    sent_at: Date;
    delivered_at: Date;
    error_message: string;
    created_at: Date;
}
