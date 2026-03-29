import { Repository } from 'typeorm';
import { TrashBinItem } from './entities/trash-bin.entity';
export declare class TrashService {
    private trashRepo;
    constructor(trashRepo: Repository<TrashBinItem>);
    findAll(): Promise<TrashBinItem[]>;
    create(data: Partial<TrashBinItem>): Promise<TrashBinItem>;
    update(id: string, data: Partial<TrashBinItem>): Promise<TrashBinItem>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
