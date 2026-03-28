import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CareerHistory } from './entities/career-history.entity';
import { HRDocument } from './entities/hr-document.entity';
import { Department } from '../departments/entities/department.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { AuditService } from '../audit/audit.service';
export declare class EmployeesService {
    private employeesRepository;
    private careerHistoryRepository;
    private hrDocumentRepository;
    private departmentRepository;
    private notificationsService;
    private auditService;
    constructor(employeesRepository: Repository<Employee>, careerHistoryRepository: Repository<CareerHistory>, hrDocumentRepository: Repository<HRDocument>, departmentRepository: Repository<Department>, notificationsService: NotificationsService, auditService: AuditService);
    create(createEmployeeDto: Partial<Employee>): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    update(id: string, updateData: Partial<Employee>): Promise<Employee>;
    remove(id: string): Promise<void>;
    private checkDepartmentBudget;
    private calculateAnnualSalary;
    findByEmployeeCode(code: string): Promise<Employee | null>;
    findByUserId(userId: string): Promise<Employee | null>;
    private cleanEmptyStrings;
}
