import { Repository } from 'typeorm';
import { Departure } from './entities/departure.entity';
export declare class DeparturesService {
    private repo;
    constructor(repo: Repository<Departure>);
    findAll(): Promise<Departure[]>;
    findOne(id: string): Promise<Departure>;
    create(data: Partial<Departure>): Promise<Departure>;
    update(id: string, data: Partial<Departure>): Promise<Departure>;
    complete(id: string): Promise<Departure>;
    remove(id: string): Promise<void>;
}
