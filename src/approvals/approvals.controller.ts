import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApprovalsService } from './approvals.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Approvals')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Get('workflows')
  @ApiOperation({ summary: 'Get all active approval workflows' })
  async getWorkflows() {
    return this.approvalsService.findAllWorkflows();
  }

  @Get('workflows/:id/steps')
  @ApiOperation({ summary: 'Get steps for a specific workflow' })
  async getSteps(@Param('id') id: string) {
    return this.approvalsService.findSteps(id);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get all approval requests' })
  async getRequests() {
    return this.approvalsService.findAllRequests();
  }

  @Patch('requests/:id/approve')
  @ApiOperation({ summary: 'Approve a request' })
  async approveRequest(@Param('id') id: string, @Request() req: any, @Body('comment') comment?: string) {
    return this.approvalsService.approveRequest(id, req.user.id, comment);
  }

  @Patch('requests/:id/reject')
  @ApiOperation({ summary: 'Reject a request' })
  async rejectRequest(@Param('id') id: string, @Request() req: any, @Body('comment') comment: string) {
    return this.approvalsService.rejectRequest(id, req.user.id, comment);
  }

  @Get('requests/:id/actions')
  @ApiOperation({ summary: 'Get actions history for a request' })
  async getActions(@Param('id') id: string) {
    return this.approvalsService.findActions(id);
  }
}
