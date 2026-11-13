import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Contract } from '../contracts/entities/contract.entity';
import { NotificationsService } from './notifications.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AlertsTask {
    private readonly employeeRepository;
    private readonly contractRepository;
    private readonly notificationsService;
    private readonly eventEmitter;
    private readonly logger;
    constructor(employeeRepository: Repository<Employee>, contractRepository: Repository<Contract>, notificationsService: NotificationsService, eventEmitter: EventEmitter2);
    checkCriticalDates(): Promise<void>;
    private getDaysDifference;
}
