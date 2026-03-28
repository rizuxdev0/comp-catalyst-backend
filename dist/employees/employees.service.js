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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const career_history_entity_1 = require("./entities/career-history.entity");
const hr_document_entity_1 = require("./entities/hr-document.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const audit_service_1 = require("../audit/audit.service");
let EmployeesService = class EmployeesService {
    constructor(employeesRepository, careerHistoryRepository, hrDocumentRepository, departmentRepository, notificationsService, auditService) {
        this.employeesRepository = employeesRepository;
        this.careerHistoryRepository = careerHistoryRepository;
        this.hrDocumentRepository = hrDocumentRepository;
        this.departmentRepository = departmentRepository;
        this.notificationsService = notificationsService;
        this.auditService = auditService;
    }
    async create(createEmployeeDto) {
        const cleaned = this.cleanEmptyStrings(createEmployeeDto);
        if (cleaned.department_id && cleaned.base_salary) {
            await this.checkDepartmentBudget(cleaned.department_id, cleaned.base_salary, cleaned.salary_frequency);
        }
        const employee = this.employeesRepository.create(cleaned);
        const saved = await this.employeesRepository.save(employee);
        await this.auditService.log({
            action: 'create',
            entityType: 'employee',
            entityId: saved.id,
            entityName: `${saved.first_name || ''} ${saved.last_name || ''}`.trim() || saved.id,
            newValues: cleaned,
        });
        return saved;
    }
    async findAll() {
        return this.employeesRepository.find({ relations: ['user', 'department'] });
    }
    async findOne(id) {
        const employee = await this.employeesRepository.findOne({
            where: { id },
            relations: ['user', 'department'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    async update(id, updateData) {
        const old = await this.findOne(id);
        const cleaned = this.cleanEmptyStrings(updateData);
        const deptId = cleaned.department_id || old.department_id;
        const baseSalary = cleaned.base_salary !== undefined ? cleaned.base_salary : old.base_salary;
        const frequency = cleaned.salary_frequency || old.salary_frequency;
        if (deptId && baseSalary !== undefined) {
            await this.checkDepartmentBudget(deptId, baseSalary, frequency, id);
        }
        await this.employeesRepository.update(id, cleaned);
        await this.auditService.log({
            action: 'update',
            entityType: 'employee',
            entityId: id,
            entityName: `${old.first_name || ''} ${old.last_name || ''}`.trim() || id,
            oldValues: old,
            newValues: cleaned,
        });
        return this.findOne(id);
    }
    async remove(id) {
        const old = await this.findOne(id);
        await this.employeesRepository.delete(id);
        await this.auditService.log({
            action: 'delete',
            entityType: 'employee',
            entityId: id,
            entityName: `${old.first_name || ''} ${old.last_name || ''}`.trim() || id,
        });
    }
    async checkDepartmentBudget(departmentId, newBaseSalary, frequency, excludeEmployeeId) {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
            relations: ['employees', 'manager', 'manager.user']
        });
        if (!department || !department.budget || department.budget <= 0) {
            return;
        }
        const annualNewSalary = this.calculateAnnualSalary(newBaseSalary, frequency);
        let currentAnnualPayroll = 0;
        if (department.employees) {
            for (const emp of department.employees) {
                const isActiveOrOnLeave = emp.employee_status !== employee_entity_1.EmployeeStatus.TERMINATED &&
                    emp.employee_status !== employee_entity_1.EmployeeStatus.RETIRED;
                if (emp.id !== excludeEmployeeId && isActiveOrOnLeave) {
                    currentAnnualPayroll += this.calculateAnnualSalary(emp.base_salary, emp.salary_frequency);
                }
            }
        }
        const totalProposedPayroll = currentAnnualPayroll + annualNewSalary;
        if (totalProposedPayroll > department.budget) {
            const exceededBy = totalProposedPayroll - department.budget;
            if (department.manager?.userId) {
                await this.notificationsService.create({
                    userId: department.manager.userId,
                    title: 'Alerte Budget Département',
                    message: `Le budget annuel du département ${department.name} est dépassé de ${exceededBy.toLocaleString()} par une modification de salaire.`,
                    type: 'warning',
                    category: 'budget',
                    relatedId: departmentId
                });
            }
            throw new common_1.BadRequestException(`Dépassement de budget pour le département ${department.name}. Budget: ${department.budget.toLocaleString()}, Total après modification: ${totalProposedPayroll.toLocaleString()}.`);
        }
    }
    calculateAnnualSalary(baseSalary, frequency) {
        const salary = Number(baseSalary) || 0;
        switch (frequency) {
            case employee_entity_1.SalaryFrequency.ANNUAL:
                return salary;
            case employee_entity_1.SalaryFrequency.MONTHLY:
                return salary * 12;
            case employee_entity_1.SalaryFrequency.BIWEEKLY:
                return salary * 26;
            case employee_entity_1.SalaryFrequency.WEEKLY:
                return salary * 52;
            default:
                return salary * 12;
        }
    }
    async findByEmployeeCode(code) {
        return this.employeesRepository.findOne({ where: { employee_code: code } });
    }
    async findByUserId(userId) {
        return this.employeesRepository.findOne({
            where: { userId },
            relations: ['department'],
        });
    }
    cleanEmptyStrings(data) {
        const cleaned = {};
        for (const [key, value] of Object.entries(data)) {
            if (value === '' || value === undefined) {
                continue;
            }
            cleaned[key] = value;
        }
        return cleaned;
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(career_history_entity_1.CareerHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(hr_document_entity_1.HRDocument)),
    __param(3, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService,
        audit_service_1.AuditService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map