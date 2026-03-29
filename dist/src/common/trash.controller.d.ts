import { TrashService } from './trash.service';
export declare class TrashController {
    private readonly svc;
    constructor(svc: TrashService);
    getTrash(): Promise<import("./entities/trash-bin.entity").TrashBinItem[]>;
    createTrash(data: any, req: any): Promise<import("./entities/trash-bin.entity").TrashBinItem>;
    updateTrash(id: string, data: any): Promise<import("./entities/trash-bin.entity").TrashBinItem>;
    deleteTrash(id: string): Promise<import("typeorm").DeleteResult>;
}
