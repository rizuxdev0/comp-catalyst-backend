import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee, SalaryFrequency, EmployeeStatus } from './entities/employee.entity';
import { CareerHistory } from './entities/career-history.entity';
import { HRDocument } from './entities/hr-document.entity';
import { Department } from '../departments/entities/department.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { EmployeeUpdateRequest } from './entities/employee-update-request.entity';
import { AuditService } from '../audit/audit.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(CareerHistory)
    private careerHistoryRepository: Repository<CareerHistory>,
    @InjectRepository(HRDocument)
    private hrDocumentRepository: Repository<HRDocument>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(EmployeeUpdateRequest)
    private updateRequestsRepository: Repository<EmployeeUpdateRequest>,
    private notificationsService: NotificationsService,
    private auditService: AuditService,
  ) {}

  async create(createEmployeeDto: Partial<Employee>): Promise<Employee> {
    const cleaned = this.cleanEmptyStrings(createEmployeeDto);
    
    // Check Budget if department and salary are provided
    if (cleaned.department_id && cleaned.base_salary) {
      await this.checkDepartmentBudget(cleaned.department_id, cleaned.base_salary, cleaned.salary_frequency);
    }

    const employee = this.employeesRepository.create(cleaned);
    const saved = await this.employeesRepository.save(employee);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'create',
      entityType: 'employee',
      entityId: saved.id,
      entityName: `${saved.first_name || ''} ${saved.last_name || ''}`.trim() || saved.id,
      newValues: cleaned,
    });
    
    return saved;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({ relations: ['user', 'department'] });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['user', 'department'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateData: Partial<Employee>): Promise<Employee> {
    const old = await this.findOne(id);
    const cleaned = this.cleanEmptyStrings(updateData);
    
    // Check Budget if department (new or old) and salary (new or old) are provided
    const deptId = cleaned.department_id || old.department_id;
    const baseSalary = cleaned.base_salary !== undefined ? cleaned.base_salary : old.base_salary;
    const frequency = cleaned.salary_frequency || old.salary_frequency;

    if (deptId && baseSalary !== undefined) {
      await this.checkDepartmentBudget(deptId, baseSalary, frequency, id);
    }

    await this.employeesRepository.update(id, cleaned);
    
    // AUDIT LOG
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

  async remove(id: string): Promise<void> {
    const old = await this.findOne(id);
    await this.employeesRepository.delete(id);
    
    // AUDIT LOG
    await this.auditService.log({
      action: 'delete',
      entityType: 'employee',
      entityId: id,
      entityName: `${old.first_name || ''} ${old.last_name || ''}`.trim() || id,
    });
  }

  private async checkDepartmentBudget(departmentId: string, newBaseSalary: number, frequency: SalaryFrequency, excludeEmployeeId?: string) {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
      relations: ['employees', 'manager', 'manager.user']
    });

    if (!department || !department.budget || department.budget <= 0) {
      return; 
    }

    const annualNewSalary = this.calculateAnnualSalary(newBaseSalary, frequency);
    
    // Calculate current annual payroll of other employees in department
    let currentAnnualPayroll = 0;
    if (department.employees) {
      for (const emp of department.employees) {
        // Only count employees who are not terminated or retired
        const isActiveOrOnLeave = emp.employee_status !== EmployeeStatus.TERMINATED && 
                                  emp.employee_status !== EmployeeStatus.RETIRED;

        if (emp.id !== excludeEmployeeId && isActiveOrOnLeave) {
          currentAnnualPayroll += this.calculateAnnualSalary(emp.base_salary, emp.salary_frequency);
        }
      }
    }

    const totalProposedPayroll = currentAnnualPayroll + annualNewSalary;

    if (totalProposedPayroll > department.budget) {
      const exceededBy = totalProposedPayroll - department.budget;
      
      // Notify Manager if exists
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

      throw new BadRequestException(
        `Dépassement de budget pour le département ${department.name}. Budget: ${department.budget.toLocaleString()}, Total après modification: ${totalProposedPayroll.toLocaleString()}.`
      );
    }
  }

  private calculateAnnualSalary(baseSalary: number, frequency: SalaryFrequency): number {
    const salary = Number(baseSalary) || 0;
    switch (frequency) {
      case SalaryFrequency.ANNUAL:
        return salary;
      case SalaryFrequency.MONTHLY:
        return salary * 12;
      case SalaryFrequency.BIWEEKLY:
        return salary * 26;
      case SalaryFrequency.WEEKLY:
        return salary * 52;
      default:
        return salary * 12; // Default to monthly
    }
  }

  async findByEmployeeCode(code: string): Promise<Employee | null> {
    return this.employeesRepository.findOne({ where: { employee_code: code } });
  }

  async findByUserId(userId: string): Promise<Employee | null> {
    return this.employeesRepository.findOne({
      where: { userId },
      relations: ['department'],
    });
  }

  async createUpdateRequest(userId: string, data: Partial<EmployeeUpdateRequest>): Promise<EmployeeUpdateRequest> {
    const employee = await this.findByUserId(userId);
    if (!employee) throw new NotFoundException('Employé non trouvé');

    const request = this.updateRequestsRepository.create({
      ...data,
      employee_id: employee.id,
      status: 'pending',
    });

    const saved = await this.updateRequestsRepository.save(request);
    
    // Notify RH
    // (Logic for finding RH users is omitted for brevity, but usually we broadcast or check roles)
    
    return saved;
  }

  async findAllUpdateRequests(): Promise<EmployeeUpdateRequest[]> {
    return this.updateRequestsRepository.find({ order: { created_at: 'DESC' } });
  }

  async findUserUpdateRequests(userId: string): Promise<EmployeeUpdateRequest[]> {
    const employee = await this.findByUserId(userId);
    if (!employee) return [];
    return this.updateRequestsRepository.find({ 
      where: { employee_id: employee.id },
      order: { created_at: 'DESC' }
    });
  }

  async approveUpdateRequest(id: string, admin: User): Promise<EmployeeUpdateRequest> {
    const request = await this.updateRequestsRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Demande non trouvée');

    if (request.status !== 'pending') {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    // Apply the change to employee
    const employee = await this.findOne(request.employee_id);
    (employee as any)[request.field_name] = request.new_value;
    await this.employeesRepository.save(employee);

    // Update request status
    request.status = 'approved';
    request.approved_by = admin.id;
    request.approved_at = new Date();
    
    const saved = await this.updateRequestsRepository.save(request);

    await this.auditService.log({
      action: 'approve_update',
      entityType: 'employee_update',
      entityId: id,
      entityName: `${employee.first_name} ${employee.last_name}`,
      newValues: { [request.field_name]: request.new_value },
    });

    return saved;
  }

  async rejectUpdateRequest(id: string, reason: string): Promise<EmployeeUpdateRequest> {
    const request = await this.updateRequestsRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Demande non trouvée');

    request.status = 'rejected';
    request.rejection_reason = reason;
    
    return this.updateRequestsRepository.save(request);
  }

  // Helper: convert empty strings to null for optional fields
  private cleanEmptyStrings(data: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === '' || value === undefined) {
        // Don't include empty strings – let columns use their DB defaults / null
        continue;
      }
      cleaned[key] = value;
    }
    return cleaned;
  }
}
