import { Repository } from 'typeorm';
import { DisciplinaryAction } from './entities/disciplinary-action.entity';
export declare class DisciplinaryService {
    private repo;
    constructor(repo: Repository<DisciplinaryAction>);
    findAll(): Promise<DisciplinaryAction[]>;
    findOne(id: string): Promise<DisciplinaryAction>;
    findByEmployee(employeeId: string): Promise<DisciplinaryAction[]>;
    create(data: Partial<DisciplinaryAction>): Promise<DisciplinaryAction>;
    update(id: string, data: Partial<DisciplinaryAction>): Promise<DisciplinaryAction>;
    remove(id: string): Promise<void>;
}
