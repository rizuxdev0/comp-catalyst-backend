import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HolidayPlanService } from './holiday-plan.service';

@ApiTags('holiday-plan')
@Controller('holiday-plan')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class HolidayPlanController {
  constructor(private readonly holidayPlanService: HolidayPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a holiday plan' })
  create(@Body() data: any, @Request() req: any) {
    return this.holidayPlanService.create(data, req.user);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple holiday plans (Excel import)' })
  bulkCreate(@Body() plans: any[]) {
    return this.holidayPlanService.bulkCreate(plans);
  }

  @Get()
  @ApiOperation({ summary: 'List holiday plans with filters' })
  @ApiQuery({ name: 'departmentId', required: false })
  @ApiQuery({ name: 'employeeId', required: false })
  @ApiQuery({ name: 'year', required: false })
  findAll(
    @Query('departmentId') departmentId?: string,
    @Query('employeeId') employeeId?: string,
    @Query('year') year?: number,
  ) {
    return this.holidayPlanService.findAll({ departmentId, employeeId, year });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a holiday plan' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.holidayPlanService.update(id, data);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a holiday plan' })
  approve(@Param('id') id: string, @Request() req: any) {
    return this.holidayPlanService.approve(id, req.user.id);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a holiday plan' })
  reject(@Param('id') id: string) {
    return this.holidayPlanService.reject(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a holiday plan' })
  cancel(@Param('id') id: string) {
    return this.holidayPlanService.cancel(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holiday plan' })
  remove(@Param('id') id: string) {
    return this.holidayPlanService.remove(id);
  }
}
