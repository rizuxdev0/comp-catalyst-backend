import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { User } from '../users/entities/user.entity';
export declare class AnnouncementsService {
    private repo;
    constructor(repo: Repository<Announcement>);
    findAll(activeOnly?: boolean): Promise<Announcement[]>;
    findOne(id: string): Promise<Announcement>;
    create(data: Partial<Announcement>, author: User): Promise<Announcement>;
    update(id: string, data: Partial<Announcement>): Promise<Announcement>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
