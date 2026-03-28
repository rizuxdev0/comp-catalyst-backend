import { AnnouncementsService } from './announcements.service';
import { Announcement } from './entities/announcement.entity';
export declare class AnnouncementsController {
    private service;
    constructor(service: AnnouncementsService);
    findAll(all?: string): Promise<Announcement[]>;
    findOne(id: string): Promise<Announcement>;
    create(data: Partial<Announcement>, req: any): Promise<Announcement>;
    update(id: string, data: Partial<Announcement>): Promise<Announcement>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
