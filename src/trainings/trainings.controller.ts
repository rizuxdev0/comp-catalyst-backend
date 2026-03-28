import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TrainingsService } from './trainings.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Trainings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all company trainings' })
  async getTrainings() {
    return this.trainingsService.findAllTrainings();
  }

  @Post()
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Create a new training program' })
  async createTraining(@Body() data: any) {
    return this.trainingsService.createTraining(data);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Update training details' })
  async updateTraining(@Param('id') id: string, @Body() data: any) {
    return this.trainingsService.updateTraining(id, data);
  }

  @Get('enrollments')
  @ApiOperation({ summary: 'List all training enrollments' })
  async getEnrollments() {
    return this.trainingsService.findAllEnrollments();
  }

  @Post(':id/enroll')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Enroll employees in a training' })
  async enrollEmployees(@Param('id') id: string, @Body('employeeIds') employeeIds: string[]) {
    return this.trainingsService.enrollEmployees(id, employeeIds);
  }

  @Patch('enrollments/:id/complete')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Mark an enrollment as completed' })
  async completeEnrollment(@Param('id') id: string, @Body('certificationUrl') certificationUrl?: string) {
    return this.trainingsService.completeEnrollment(id, certificationUrl);
  }

  @Delete('enrollments/:id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Cancel an enrollment' })
  async cancelEnrollment(@Param('id') id: string) {
    return this.trainingsService.cancelEnrollment(id);
  }

  @Get('budgets')
  @ApiOperation({ summary: 'Get all training budgets' })
  async getBudgets() {
    return this.trainingsService.findBudgets();
  }
}
