import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
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

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(HRDocument)
    private hrDocumentRepository: Repository<HRDocument>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(JobPosting)
    private jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(TalentPool)
    private talentPoolRepository: Repository<TalentPool>,
    @InjectRepository(TrainingCatalogItem)
    private trainingRepository: Repository<TrainingCatalogItem>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(LeaveRequest)
    private leaveRepository: Repository<LeaveRequest>,
  ) {}

  async globalSearch(query: string) {
    if (!query || query.length < 2) return [];

    const searchStr = `%${query}%`;

    const [
      employees,
      contracts,
      documents,
      departments,
      jobs,
      candidates,
      trainings,
      vehicles,
      positions,
      leaves
    ] = await Promise.all([
      this.employeeRepository.find({
        where: [
          { first_name: ILike(searchStr) },
          { last_name: ILike(searchStr) },
          { work_email: ILike(searchStr) },
          { employee_code: ILike(searchStr) },
        ],
        take: 5,
      }),
      this.contractRepository.find({
        where: [
          { contractNumber: ILike(searchStr) },
          { jobTitle: ILike(searchStr) },
        ],
        relations: ['employee'],
        take: 5,
      }),
      this.hrDocumentRepository.find({
        where: [{ title: ILike(searchStr) }],
        take: 5,
      }),
      this.departmentRepository.find({
        where: [{ name: ILike(searchStr) }],
        take: 5,
      }),
      this.jobPostingRepository.find({
        where: [
          { title: ILike(searchStr) },
          { department: ILike(searchStr) }
        ],
        take: 5,
      }),
      this.talentPoolRepository.find({
        where: [
          { candidateName: ILike(searchStr) },
          { candidateEmail: ILike(searchStr) }
        ],
        take: 5,
      }),
      this.trainingRepository.find({
        where: [
          { name: ILike(searchStr) },
          { code: ILike(searchStr) }
        ],
        take: 5,
      }),
      this.vehicleRepository.find({
        where: [
          { make: ILike(searchStr) },
          { model: ILike(searchStr) },
          { registrationNumber: ILike(searchStr) }
        ],
        relations: ['currentEmployee'],
        take: 5,
      }),
      this.positionRepository.find({
        where: [{ title: ILike(searchStr) }],
        take: 5,
      }),
      this.leaveRepository.find({
        where: [
          { reason: ILike(searchStr) }
        ],
        relations: ['employee', 'leaveType'],
        take: 5,
      }),
    ]);

    const results = [
      ...employees.map(e => ({
        type: 'employee',
        id: e.id,
        title: `${e.first_name} ${e.last_name}`,
        subtitle: e.job_title || e.employee_code,
        url: `/employees`,
      })),
      ...contracts.map(c => ({
        type: 'contract',
        id: c.id,
        title: c.contractNumber,
        subtitle: c.employee ? `${c.employee.first_name} ${c.employee.last_name}` : 'N/A',
        url: `/contracts`,
      })),
      ...documents.map(d => ({
        type: 'document',
        id: d.id,
        title: d.title,
        subtitle: 'Document RH',
        url: `/documents`,
      })),
      ...departments.map(d => ({
        type: 'department',
        id: d.id,
        title: d.name,
        subtitle: 'Département',
        url: `/departments`,
      })),
      ...jobs.map(j => ({
        type: 'job',
        id: j.id,
        title: j.title,
        subtitle: j.department,
        url: `/recruitment`,
      })),
      ...candidates.map(c => ({
        type: 'candidate',
        id: c.id,
        title: c.candidateName,
        subtitle: c.candidateEmail,
        url: `/recruitment`,
      })),
      ...trainings.map(t => ({
        type: 'training',
        id: t.id,
        title: t.name,
        subtitle: t.code,
        url: `/training-catalog`,
      })),
      ...vehicles.map(v => ({
        type: 'vehicle',
        id: v.id,
        title: `${v.make} ${v.model}`,
        subtitle: v.currentEmployee ? `Assigné à: ${v.currentEmployee.first_name} ${v.currentEmployee.last_name}` : v.registrationNumber,
        url: `/fleet`,
      })),
      ...positions.map(p => ({
        type: 'position',
        id: p.id,
        title: p.title,
        subtitle: 'Poste / Titre',
        url: `/settings`,
      })),
      ...leaves.map(l => ({
        type: 'leave',
        id: l.id,
        title: `${l.employee?.first_name} ${l.employee?.last_name}`,
        subtitle: `${l.leaveType?.name || 'Congé'}: ${l.reason || 'S/O'}`,
        url: `/leaves`,
      })),
    ];

    return results;
  }
}


