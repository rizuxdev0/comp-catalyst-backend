import { Repository } from 'typeorm';
import { Communication } from './entities/communication.entity';
export declare class CommunicationsService {
    private repo;
    constructor(repo: Repository<Communication>);
    findAll(): Promise<Communication[]>;
    findOne(id: string): Promise<Communication>;
    create(data: Partial<Communication>): Promise<Communication>;
    update(id: string, data: Partial<Communication>): Promise<Communication>;
    remove(id: string): Promise<void>;
    publish(id: string): Promise<Communication>;
    findByStatus(status: string): Promise<Communication[]>;
}
