import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
export declare class PositionsService {
    private positionsRepository;
    constructor(positionsRepository: Repository<Position>);
    findAll(): Promise<Position[]>;
    findOne(id: string): Promise<Position>;
    findByTitle(title: string): Promise<Position>;
    create(data: Partial<Position>): Promise<Position>;
    update(id: string, data: Partial<Position>): Promise<Position>;
    remove(id: string): Promise<Position>;
}
