import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LeavesService } from './leaves.service';
import { LeaveRequest, LeaveRequestStatus } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('leaves')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get('types')
  @ApiOperation({ summary: 'Get all active leave types' })
  @ApiResponse({ status: 200, type: [LeaveType] })
  async findAllTypes() {
    return this.leavesService.findAllTypes();
  }

  @Roles(AppRole.ADMIN)
  @Post('types')
  @ApiOperation({ summary: 'Create a new leave type' })
  async createType(@Body() data: Partial<LeaveType>) {
    return this.leavesService.createType(data);
  }

  @Roles(AppRole.ADMIN)
  @Patch('types/:id')
  @ApiOperation({ summary: 'Update a leave type' })
  async updateType(@Param('id') id: string, @Body() data: Partial<LeaveType>) {
    return this.leavesService.updateType(id, data);
  }

  @Roles(AppRole.ADMIN)
  @Delete('types/:id')
  @ApiOperation({ summary: 'Delete a leave type' })
  async deleteType(@Param('id') id: string) {
    return this.leavesService.deleteType(id);
  }

  @Get('my-requests')
  @ApiOperation({ summary: 'Get current employee leave requests' })
  @ApiResponse({ status: 200, type: [LeaveRequest] })
  async findMyRequests(@Request() req) {
    // Note: On assume que l'ID employé est lié via l'ID utilisateur.
    // Pour l'instant on passe l'ID utilisateur ou on récupère l'employé lié.
    // Mock simple: return this.leavesService.findMyRequests(req.user.id);
    return this.leavesService.findMyRequests(req.user.id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('requests')
  @ApiOperation({ summary: 'Get all leave requests (for managers)' })
  @ApiQuery({ name: 'status', enum: LeaveRequestStatus, required: false })
  @ApiResponse({ status: 200, type: [LeaveRequest] })
  async findAllRequests(@Query('status') status?: LeaveRequestStatus) {
    return this.leavesService.findAllRequests(status);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get current employee leave balances' })
  @ApiResponse({ status: 200, type: [LeaveBalance] })
  async getMyBalances(@Request() req, @Query('year') year?: number) {
    const currentYear = year || new Date().getFullYear();
    return this.leavesService.getBalances(req.user.id, currentYear);
  }

  @Post('request')
  @ApiOperation({ summary: 'Submit a new leave request' })
  @ApiResponse({ status: 201, type: LeaveRequest })
  async createRequest(@Request() req, @Body() data: Partial<LeaveRequest>) {
    return this.leavesService.createRequest(req.user.id, data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Permissions('leaves.approve')
  @Patch('request/:id/approve')
  @ApiOperation({ summary: 'Approve a leave request' })
  async approveRequest(@Param('id') id: string, @Request() req) {
    return this.leavesService.approveRequest(id, req.user.id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('request/:id/reject')
  @ApiOperation({ summary: 'Reject a leave request' })
  async rejectRequest(@Param('id') id: string, @Body('reason') reason: string) {
    return this.leavesService.rejectRequest(id, reason);
  }

  @Patch('request/:id/cancel')
  @ApiOperation({ summary: 'Cancel own leave request' })
  async cancelRequest(@Param('id') id: string, @Request() req) {
    return this.leavesService.cancelRequest(id, req.user.id);
  }
}
