import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { HrDocumentsService } from '../hr-documents/hr-documents.service';
export declare class EmployeesController {
    private readonly employeesService;
    private readonly hrDocumentsService;
    constructor(employeesService: EmployeesService, hrDocumentsService: HrDocumentsService);
    findProfile(req: any): Promise<Employee>;
    create(createEmployeeDto: Partial<Employee>): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    update(id: string, updateData: Partial<Employee>): Promise<Employee>;
    remove(id: string): Promise<void>;
    findCareerHistory(id: string): Promise<import("./entities/career-history.entity").CareerHistory[]>;
    addCareerHistory(id: string, data: any): Promise<import("./entities/career-history.entity").CareerHistory[]>;
    findDocuments(id: string): Promise<import("./entities/hr-document.entity").HRDocument[]>;
    addDocument(id: string, data: any): Promise<import("./entities/hr-document.entity").HRDocument>;
    createUpdateRequest(req: any, data: any): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest>;
    findMyUpdateRequests(req: any): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest[]>;
    findAllUpdateRequests(): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest[]>;
    approveUpdateRequest(id: string, req: any): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest>;
    rejectUpdateRequest(id: string, reason: string): Promise<import("./entities/employee-update-request.entity").EmployeeUpdateRequest>;
}
