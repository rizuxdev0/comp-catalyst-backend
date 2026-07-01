import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communication } from './entities/communication.entity';
import { CommunicationDelivery } from './entities/communication-delivery.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private repo: Repository<Communication>,
    @InjectRepository(CommunicationDelivery)
    private deliveryRepo: Repository<CommunicationDelivery>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    private eventEmitter: EventEmitter2,
  ) {}

  findAll(): Promise<Communication[]> {
    return this.repo.find({
      order: { created_at: 'DESC' },
      relations: ['recipient_employee', 'recipient_department'],
    });
  }

  async findOne(id: string): Promise<Communication> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['recipient_employee', 'recipient_department'],
    });
    if (!item) throw new NotFoundException('Communication non trouvée');
    return item;
  }

  async create(data: Partial<Communication>): Promise<Communication> {
    const item = this.repo.create(data);
    const saved = await this.repo.save(item);
    
    if (saved.status === 'published') {
      const fullDoc = await this.findOne(saved.id);
      this.eventEmitter.emit('communication.published', fullDoc);
    }
    
    return saved;
  }

  async update(id: string, data: Partial<Communication>): Promise<Communication> {
    const oldItem = await this.findOne(id);
    await this.repo.update(id, data);
    const updatedItem = await this.findOne(id);
    
    if (oldItem.status !== 'published' && updatedItem.status === 'published') {
      this.eventEmitter.emit('communication.published', updatedItem);
    }
    
    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async publish(id: string): Promise<Communication> {
    await this.repo.update(id, {
      status: 'published',
      published_at: new Date(),
    });
    const communication = await this.findOne(id);
    this.eventEmitter.emit('communication.published', communication);
    return communication;
  }

  findByStatus(status: string): Promise<Communication[]> {
    return this.repo.find({ where: { status }, order: { created_at: 'DESC' } });
  }

  async findForUser(userId: string): Promise<Communication[]> {
    const employee = await this.employeeRepo.findOne({ where: { userId } });
    if (!employee) return [];

    const builder = this.repo.createQueryBuilder('c');
    builder.where('c.status = :status', { status: 'published' });
    builder.andWhere(`(
      c.recipient_type = 'all' OR
      (c.recipient_type = 'department' AND c.recipient_department_id = :deptId) OR
      ((c.recipient_type = 'individual' OR c.recipient_type = 'employee') AND c.recipient_employee_id = :empId)
    )`, { deptId: employee.department_id, empId: employee.id });
    
    builder.orderBy('c.published_at', 'DESC');
    return builder.getMany();
  }

  async getDeliveries(communicationId: string) {
    return this.deliveryRepo.find({
      where: { communication_id: communicationId },
      order: { created_at: 'DESC' }
    });
  }

  async createDeliveries(communicationId: string, payload: any) {
    const { recipientType, recipientDepartmentId, recipientEmployeeId } = payload;
    
    let employees = [];
    if (recipientType === 'all') {
      employees = await this.employeeRepo.find({ where: { employee_status: 'active' as any } });
    } else if (recipientType === 'department' && recipientDepartmentId) {
      employees = await this.employeeRepo.find({ where: { department_id: recipientDepartmentId, employee_status: 'active' as any } });
    } else if ((recipientType === 'individual' || recipientType === 'employee') && recipientEmployeeId) {
      const emp = await this.employeeRepo.findOne({ where: { id: recipientEmployeeId } });
      if (emp) employees = [emp];
    } else {
      employees = await this.employeeRepo.find({ where: { employee_status: 'active' as any } });
    }

    const deliveries: CommunicationDelivery[] = [];
    for (const emp of employees) {
      if (!emp.work_email && !emp.personal_email) continue;
      
      const delivery = this.deliveryRepo.create({
        communication_id: communicationId,
        employee_id: emp.id,
        email_address: emp.work_email || emp.personal_email,
        email_type: emp.work_email ? 'work' : 'personal',
        status: 'pending',
      });
      deliveries.push(delivery);
    }
    
    if (deliveries.length > 0) {
      await this.deliveryRepo.save(deliveries);
    }
    
    return deliveries;
  }
}
