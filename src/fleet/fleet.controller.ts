import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FleetService } from './fleet.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Fleet')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Get()
  @ApiOperation({ summary: 'Get all company vehicles' })
  async findAll() {
    return this.fleetService.findAll();
  }

  @Post()
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Register a new organizational vehicle' })
  async create(@Body() data: any) {
    return this.fleetService.create(data);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Update an organizational vehicle record' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.fleetService.update(id, data);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Remove a vehicle from organizational registry' })
  async remove(@Param('id') id: string) {
    return this.fleetService.remove(id);
  }

  @Post(':id/assign/:employeeId')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Assign a vehicle to an employee' })
  async assign(@Param('id') id: string, @Param('employeeId') employeeId: string) {
    return this.fleetService.assignToEmployee(id, employeeId);
  }

  @Post(':id/unassign')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Collect vehicle from employee' })
  async unassign(@Param('id') id: string) {
    return this.fleetService.unassign(id);
  }
}
