import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HRTicketsService } from './hr-tickets.service';

@ApiTags('hr-tickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class HRTicketsController {
  constructor(private readonly svc: HRTicketsService) {}

  @Get('hr-tickets')
  @ApiOperation({ summary: 'List HR tickets' })
  getTickets() { return this.svc.findAllTickets(); }

  @Post('hr-tickets')
  createTicket(@Body() data: any) { return this.svc.createTicket(data); }

  @Patch('hr-tickets/:id')
  updateTicket(@Param('id') id: string, @Body() data: any) { return this.svc.updateTicket(id, data); }

  @Get('hr-tickets/:id/messages')
  getMessages(@Param('id') id: string) { return this.svc.findMessages(id); }

  @Post('hr-tickets/:id/messages')
  createMessage(@Param('id') id: string, @Body() data: any) { return this.svc.createMessage(id, data); }

  @Get('hr-faq')
  getFaqs() { return this.svc.findAllFaq(); }

  @Post('hr-faq')
  createFaq(@Body() data: any) { return this.svc.createFaq(data); }

  @Post('hr-faq/:id/increment-view')
  incrementFaqViews(@Param('id') id: string) { return this.svc.incrementFaqViews(id); }
}
