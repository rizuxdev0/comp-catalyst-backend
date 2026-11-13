import { Repository } from 'typeorm';
import { Communication } from './entities/communication.entity';
import { CommunicationDelivery } from './entities/communication-delivery.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Employee } from '../employees/entities/employee.entity';
export declare class CommunicationsService {
    private repo;
    private deliveryRepo;
    private employeeRepo;
    private eventEmitter;
    constructor(repo: Repository<Communication>, deliveryRepo: Repository<CommunicationDelivery>, employeeRepo: Repository<Employee>, eventEmitter: EventEmitter2);
    findAll(): Promise<Communication[]>;
    findOne(id: string): Promise<Communication>;
    create(data: Partial<Communication>): Promise<Communication>;
    update(id: string, data: Partial<Communication>): Promise<Communication>;
    remove(id: string): Promise<void>;
    publish(id: string): Promise<Communication>;
    findByStatus(status: string): Promise<Communication[]>;
    findForUser(userId: string): Promise<Communication[]>;
    getDeliveries(communicationId: string): Promise<CommunicationDelivery[]>;
    createDeliveries(communicationId: string, payload: any): Promise<CommunicationDelivery[]>;
}
