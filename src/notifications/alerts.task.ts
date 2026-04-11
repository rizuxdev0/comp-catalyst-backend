import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Contract, ContractStatus } from '../contracts/entities/contract.entity';
import { NotificationsService } from './notifications.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AlertsTask {
  private readonly logger = new Logger(AlertsTask.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly notificationsService: NotificationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // Every day at 8:00 AM
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async checkCriticalDates() {
    this.logger.log('Checking for critical dates (probation, contracts, passports)...');
    
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    // 1. CDD ending soon
    const expiringContracts = await this.contractRepository.find({
      where: {
        status: ContractStatus.ACTIVE,
        endDate: LessThanOrEqual(in30Days.toISOString().split('T')[0] as any),
      },
      relations: ['employee', 'contractType'],
    });

    for (const contract of expiringContracts) {
      if (contract.employee?.userId) {
        // Notify HR (assume we notify specific role or admins)
        // For simplicity, notify the employee and we would notify HR too
        this.eventEmitter.emit('contract.expiring', {
          userId: contract.employee.userId, // Should also notify manager
          employeeName: `${contract.employee.first_name} ${contract.employee.last_name}`,
          daysLeft: this.getDaysDifference(new Date(contract.endDate), today),
          type: contract.contractType?.name || 'CDD',
        });
      }
    }

    // 2. Probation period ending
    const expiringProbations = await this.employeeRepository.find({
      where: {
        employee_status: 'active' as any,
        probation_end_date: LessThanOrEqual(in30Days.toISOString().split('T')[0] as any),
      },
    });

    for (const employee of expiringProbations) {
      if (employee.userId) {
        await this.notificationsService.create({
          userId: employee.userId, // Notify employee/manager
          title: 'Fin de période d\'essai proche',
          message: `La période d'essai de ${employee.first_name} ${employee.last_name} se termine le ${employee.probation_end_date}.`,
          type: 'warning',
          category: 'hr',
        });
      }
    }
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
