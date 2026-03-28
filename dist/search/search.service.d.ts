import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Contract } from '../contracts/entities/contract.entity';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { Department } from '../departments/entities/department.entity';
import { JobPosting } from '../recruitment/entities/job-posting.entity';
import { TalentPool } from '../recruitment/entities/talent-pool.entity';
import { TrainingCatalogItem } from '../trainings/entities/training-catalog.entity';
import { Vehicle } from '../fleet/entities/vehicle.entity';
import { Position } from '../positions/entities/position.entity';
import { LeaveRequest } from '../leaves/entities/leave-request.entity';
export declare class SearchService {
    private employeeRepository;
    private contractRepository;
    private hrDocumentRepository;
    private departmentRepository;
    private jobPostingRepository;
    private talentPoolRepository;
    private trainingRepository;
    private vehicleRepository;
    private positionRepository;
    private leaveRepository;
    constructor(employeeRepository: Repository<Employee>, contractRepository: Repository<Contract>, hrDocumentRepository: Repository<HRDocument>, departmentRepository: Repository<Department>, jobPostingRepository: Repository<JobPosting>, talentPoolRepository: Repository<TalentPool>, trainingRepository: Repository<TrainingCatalogItem>, vehicleRepository: Repository<Vehicle>, positionRepository: Repository<Position>, leaveRepository: Repository<LeaveRequest>);
    globalSearch(query: string): Promise<{
        type: string;
        id: string;
        title: string;
        subtitle: string;
        url: string;
    }[]>;
}
