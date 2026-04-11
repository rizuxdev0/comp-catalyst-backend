import { EstablishmentService } from './establishments.service';
import { Establishment } from './entities/establishment.entity';
export declare class EstablishmentController {
    private readonly establishmentService;
    constructor(establishmentService: EstablishmentService);
    findAll(): Promise<Establishment[]>;
    findOne(id: string): Promise<Establishment>;
    create(data: Partial<Establishment>): Promise<Establishment>;
    update(id: string, data: Partial<Establishment>): Promise<Establishment>;
    remove(id: string): Promise<void>;
}
