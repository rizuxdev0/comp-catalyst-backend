"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const contract_entity_1 = require("../contracts/entities/contract.entity");
const hr_document_entity_1 = require("../employees/entities/hr-document.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const job_posting_entity_1 = require("../recruitment/entities/job-posting.entity");
const talent_pool_entity_1 = require("../recruitment/entities/talent-pool.entity");
const training_catalog_entity_1 = require("../trainings/entities/training-catalog.entity");
const vehicle_entity_1 = require("../fleet/entities/vehicle.entity");
const position_entity_1 = require("../positions/entities/position.entity");
const leave_request_entity_1 = require("../leaves/entities/leave-request.entity");
let SearchService = class SearchService {
    constructor(employeeRepository, contractRepository, hrDocumentRepository, departmentRepository, jobPostingRepository, talentPoolRepository, trainingRepository, vehicleRepository, positionRepository, leaveRepository) {
        this.employeeRepository = employeeRepository;
        this.contractRepository = contractRepository;
        this.hrDocumentRepository = hrDocumentRepository;
        this.departmentRepository = departmentRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.talentPoolRepository = talentPoolRepository;
        this.trainingRepository = trainingRepository;
        this.vehicleRepository = vehicleRepository;
        this.positionRepository = positionRepository;
        this.leaveRepository = leaveRepository;
    }
    async globalSearch(query) {
        if (!query || query.length < 2)
            return [];
        const searchStr = `%${query}%`;
        const [employees, contracts, documents, departments, jobs, candidates, trainings, vehicles, positions, leaves] = await Promise.all([
            this.employeeRepository.find({
                where: [
                    { first_name: (0, typeorm_2.ILike)(searchStr) },
                    { last_name: (0, typeorm_2.ILike)(searchStr) },
                    { work_email: (0, typeorm_2.ILike)(searchStr) },
                    { employee_code: (0, typeorm_2.ILike)(searchStr) },
                ],
                take: 5,
            }),
            this.contractRepository.find({
                where: [
                    { contractNumber: (0, typeorm_2.ILike)(searchStr) },
                    { jobTitle: (0, typeorm_2.ILike)(searchStr) },
                ],
                relations: ['employee'],
                take: 5,
            }),
            this.hrDocumentRepository.find({
                where: [{ title: (0, typeorm_2.ILike)(searchStr) }],
                take: 5,
            }),
            this.departmentRepository.find({
                where: [{ name: (0, typeorm_2.ILike)(searchStr) }],
                take: 5,
            }),
            this.jobPostingRepository.find({
                where: [
                    { title: (0, typeorm_2.ILike)(searchStr) },
                    { department: (0, typeorm_2.ILike)(searchStr) }
                ],
                take: 5,
            }),
            this.talentPoolRepository.find({
                where: [
                    { candidateName: (0, typeorm_2.ILike)(searchStr) },
                    { candidateEmail: (0, typeorm_2.ILike)(searchStr) }
                ],
                take: 5,
            }),
            this.trainingRepository.find({
                where: [
                    { name: (0, typeorm_2.ILike)(searchStr) },
                    { code: (0, typeorm_2.ILike)(searchStr) }
                ],
                take: 5,
            }),
            this.vehicleRepository.find({
                where: [
                    { make: (0, typeorm_2.ILike)(searchStr) },
                    { model: (0, typeorm_2.ILike)(searchStr) },
                    { registrationNumber: (0, typeorm_2.ILike)(searchStr) }
                ],
                relations: ['currentEmployee'],
                take: 5,
            }),
            this.positionRepository.find({
                where: [{ title: (0, typeorm_2.ILike)(searchStr) }],
                take: 5,
            }),
            this.leaveRepository.find({
                where: [
                    { reason: (0, typeorm_2.ILike)(searchStr) }
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(2, (0, typeorm_1.InjectRepository)(hr_document_entity_1.HRDocument)),
    __param(3, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(4, (0, typeorm_1.InjectRepository)(job_posting_entity_1.JobPosting)),
    __param(5, (0, typeorm_1.InjectRepository)(talent_pool_entity_1.TalentPool)),
    __param(6, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.TrainingCatalogItem)),
    __param(7, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(8, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __param(9, (0, typeorm_1.InjectRepository)(leave_request_entity_1.LeaveRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map