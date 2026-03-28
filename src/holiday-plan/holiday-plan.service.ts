import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HolidayPlan } from './entities/holiday-plan.entity';
import { Employee } from '../employees/entities/employee.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class HolidayPlanService {
  constructor(
    @InjectRepository(HolidayPlan)
    private planRepository: Repository<HolidayPlan>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private auditService: AuditService,
  ) {}

  async findAll(filters: any = {}) {
    const where: any = {};
    if (filters.departmentId) where.departmentId = filters.departmentId;
    if (filters.employeeId) where.employeeId = filters.employeeId;
    
    // Filtre par année si présent
    if (filters.year) {
      const year = parseInt(filters.year);
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      // Pour TypeORM, on peut utiliser des opérateurs de comparaison
      // Ici on va filtrer les congés qui ont au moins un jour dans l'année
      where.startDate = { $lte: end }; // placeholder if using mongo-like, but we use Postgres/SQL
    }
    
    // Better SQL filter with TypeORM
    const query = this.planRepository.createQueryBuilder('plan')
      .leftJoinAndSelect('plan.employee', 'employee')
      .leftJoinAndSelect('plan.department', 'department');

    if (filters.departmentId) {
      query.andWhere('plan.departmentId = :deptId', { deptId: filters.departmentId });
    }
    
    if (filters.year) {
      const year = filters.year;
      query.andWhere('(EXTRACT(YEAR FROM plan.startDate) = :year OR EXTRACT(YEAR FROM plan.endDate) = :year)', { year });
    }

    return query.orderBy('plan.startDate', 'ASC').getMany();
  }

  async create(data: Partial<HolidayPlan>, user: any) {
    const roles = user.roles.map(r => r.role);
    const isAdmin = roles.includes('admin') || roles.includes('super-admin');
    
    // Fetch target employee
    const targetEmployee = await this.employeeRepository.findOne({
      where: { id: data.employeeId },
      relations: ['department']
    });
    if (!targetEmployee) throw new NotFoundException('Employee not found');

    // Default department
    if (!data.departmentId) data.departmentId = targetEmployee.department_id;

    if (!isAdmin) {
      // Find Requester Employee
      const requesterEmployee = await this.employeeRepository.findOneBy({ userId: user.id });
      if (!requesterEmployee) throw new NotFoundException('Requester profile not found');

      // Rules: 
      // 1. Self request
      if (requesterEmployee.id === data.employeeId) {
         // OK
      } else {
        // 2. Manager of the department
        const targetDept = targetEmployee.department;
        if (targetDept?.managerId !== requesterEmployee.id) {
          throw new Error('You do not have permission to request leave for this employee');
        }
      }
    }
    
    const plan = this.planRepository.create({
      ...data,
      status: 'pending' // Always starts as pending for approval course
    });
    const saved = await this.planRepository.save(plan);

    // LOG TO AUDIT
    await this.auditService.log({
      userId: user.id,
      action: 'create',
      entityType: 'leave_request',
      entityId: saved.id,
      entityName: `${targetEmployee.first_name} ${targetEmployee.last_name}`,
      newValues: { startDate: data.startDate, endDate: data.endDate }
    });

    return saved;
  }

  async approve(id: string, approvedBy: string) {
    const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!plan) throw new NotFoundException('Plan not found');
    await this.planRepository.update(id, { 
      status: 'approved',
      approvedBy,
      approvedAt: new Date()
    });

    // LOG TO AUDIT
    await this.auditService.log({
      userId: approvedBy,
      action: 'approve',
      entityType: 'leave_request',
      entityId: id,
      entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
    });

    return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
  }

  async reject(id: string, rejectionReason?: string) {
    const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!plan) throw new NotFoundException('Plan not found');
    await this.planRepository.update(id, { 
      status: 'rejected',
      rejectionReason 
    });

    // LOG TO AUDIT
    await this.auditService.log({
      action: 'reject',
      entityType: 'leave_request',
      entityId: id,
      entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
      newValues: { reason: rejectionReason }
    });

    return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
  }

  async update(id: string, data: Partial<HolidayPlan>) {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException('Plan not found');
    await this.planRepository.update(id, data);
    return this.planRepository.findOneBy({ id });
  }

  async cancel(id: string) {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException('Plan not found');
    await this.planRepository.update(id, { status: 'cancelled' });
    return this.planRepository.findOne({ where: { id }, relations: ['employee', 'department'] });
  }

  async remove(id: string) {
    const plan = await this.planRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!plan) throw new NotFoundException('Plan not found');
    
    // LOG TO AUDIT
    await this.auditService.log({
      action: 'delete',
      entityType: 'leave_request',
      entityId: id,
      entityName: `${plan.employee?.first_name} ${plan.employee?.last_name}`,
    });

    return this.planRepository.remove(plan);
  }

  async bulkCreate(plans: any[]) {
    // Used for Excel import
    return this.planRepository.save(this.planRepository.create(plans));
  }
}
