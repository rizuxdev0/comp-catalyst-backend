import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StaffDelegatesService } from './staff-delegates.service';

@ApiTags('staff-delegates-updates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class StaffDelegatesController {
  constructor(private readonly svc: StaffDelegatesService) {}

  // ======= STAFF DELEGATES =======
  @Get('staff-delegates')
  @ApiOperation({ summary: 'List staff delegates' })
  getDelegates() { return this.svc.findAllDelegates(); }

  @Post('staff-delegates')
  createDelegate(@Body() data: any) { return this.svc.createDelegate(data); }

  @Patch('staff-delegates/:id')
  updateDelegate(@Param('id') id: string, @Body() data: any) { return this.svc.updateDelegate(id, data); }

  // ======= DELEGATE SETTINGS =======
  @Get('delegate-settings')
  getDelegateSettings() { return this.svc.findAllDelegateSettings(); }

  @Post('delegate-settings')
  upsertDelegateSetting(@Body() data: any) { return this.svc.createOrUpdateDelegateSetting(data); }

  // ======= EMPLOYEE UPDATE REQUESTS =======
  @Get('employee-update-requests')
  getUpdateRequests() { return this.svc.findAllUpdateRequests(); }

  @Post('employee-update-requests')
  createUpdateRequest(@Body() data: any) { return this.svc.createUpdateRequest(data); }

  @Patch('employee-update-requests/:id')
  updateUpdateRequest(@Param('id') id: string, @Body() data: any) { return this.svc.updateUpdateRequest(id, data); }
}
