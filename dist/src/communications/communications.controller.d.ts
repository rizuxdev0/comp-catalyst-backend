import { CommunicationsService } from './communications.service';
export declare class CommunicationsController {
    private readonly service;
    constructor(service: CommunicationsService);
    findForEmployee(req: any): Promise<import("./entities/communication.entity").Communication[]>;
    findAll(status?: string): Promise<import("./entities/communication.entity").Communication[]>;
    findOne(id: string): Promise<import("./entities/communication.entity").Communication>;
    create(data: any, req: any): Promise<import("./entities/communication.entity").Communication>;
    update(id: string, data: any): Promise<import("./entities/communication.entity").Communication>;
    publish(id: string): Promise<import("./entities/communication.entity").Communication>;
    remove(id: string): Promise<void>;
    getDeliveries(communicationId: string): Promise<import("./entities/communication-delivery.entity").CommunicationDelivery[]>;
    createDeliveries(communicationId: string, data: any): Promise<import("./entities/communication-delivery.entity").CommunicationDelivery[]>;
}
