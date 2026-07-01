import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { CommunicationDelivery } from './entities/communication-delivery.entity';
import { HRTicket, TicketMessage, HRFAQ } from './entities/hr-ticket.entity';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { HRTicketsService } from './hr-tickets.service';
import { HRTicketsController } from './hr-tickets.controller';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Communication,
    CommunicationDelivery,
    HRTicket,
    TicketMessage,
    HRFAQ,
    Employee
  ])],
  controllers: [CommunicationsController, HRTicketsController],
  providers: [CommunicationsService, HRTicketsService],
  exports: [CommunicationsService, HRTicketsService],
})
export class CommunicationsModule {}
