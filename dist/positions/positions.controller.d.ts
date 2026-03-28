import { PositionsService } from './positions.service';
export declare class PositionsController {
    private readonly positionsService;
    constructor(positionsService: PositionsService);
    create(createPositionDto: any): Promise<import("./entities/position.entity").Position>;
    findAll(): Promise<import("./entities/position.entity").Position[]>;
    findOne(id: string): Promise<import("./entities/position.entity").Position>;
    update(id: string, updatePositionDto: any): Promise<import("./entities/position.entity").Position>;
    remove(id: string): Promise<import("./entities/position.entity").Position>;
}
