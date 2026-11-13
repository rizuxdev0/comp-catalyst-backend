import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { AuditService } from '../audit/audit.service';
export declare class DepartmentsService {
    private departmentRepository;
    private auditService;
    constructor(departmentRepository: Repository<Department>, auditService: AuditService);
    create(createDepartmentDto: Partial<Department>): Promise<Department>;
    findAll(): Promise<Department[]>;
    findOne(id: string): Promise<Department>;
    update(id: string, updateData: Partial<Department>): Promise<Department>;
    remove(id: string): Promise<void>;
}
