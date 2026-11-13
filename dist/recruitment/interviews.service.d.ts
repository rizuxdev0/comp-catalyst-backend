import { Repository } from 'typeorm';
import { Interview } from './entities/interview.entity';
export declare class InterviewsService {
    private interviewsRepo;
    constructor(interviewsRepo: Repository<Interview>);
    findAll(): Promise<Interview[]>;
    create(data: Partial<Interview>): Promise<Interview>;
    update(id: string, data: Partial<Interview>): Promise<Interview>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
