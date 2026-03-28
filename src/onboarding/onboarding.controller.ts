import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request, Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly service: OnboardingService) {}

  // ── Checklists ──────────────────────────────────────────────
  @Get('checklists')
  @ApiOperation({ summary: 'Lister toutes les checklists d\'onboarding' })
  findAll() {
    return this.service.findAllChecklists();
  }

  @Get('checklists/employee/:employeeId')
  @ApiOperation({ summary: 'Checklists d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get('checklists/:id')
  @ApiOperation({ summary: 'Détail d\'une checklist' })
  findOne(@Param('id') id: string) {
    return this.service.findChecklist(id);
  }

  @Post('checklists')
  @ApiOperation({ summary: 'Créer une checklist d\'onboarding' })
  createChecklist(@Body() data: any, @Request() req: any) {
    return this.service.createChecklist({ ...data, created_by: req.user.id });
  }

  @Patch('checklists/:id')
  @ApiOperation({ summary: 'Modifier une checklist' })
  updateChecklist(@Param('id') id: string, @Body() data: any) {
    return this.service.updateChecklist(id, data);
  }

  @Delete('checklists/:id')
  @ApiOperation({ summary: 'Supprimer une checklist' })
  removeChecklist(@Param('id') id: string) {
    return this.service.removeChecklist(id);
  }

  // ── Tasks (root-level, used by frontend) ────────────────────
  @Get('tasks')
  @ApiOperation({ summary: 'Lister toutes les tâches (avec filtre optionnel checklistId)' })
  findAllTasks(@Query('checklistId') checklistId?: string) {
    if (checklistId) return this.service.findTasksByChecklist(checklistId);
    return this.service.findAllTasks();
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Créer une tâche' })
  createTask(@Body() data: any) {
    return this.service.createTask(data);
  }

  @Get('checklists/:checklistId/tasks')
  @ApiOperation({ summary: 'Tâches d\'une checklist' })
  findTasks(@Param('checklistId') checklistId: string) {
    return this.service.findTasksByChecklist(checklistId);
  }

  @Post('checklists/:checklistId/tasks')
  @ApiOperation({ summary: 'Ajouter une tâche' })
  createTaskInChecklist(@Param('checklistId') checklistId: string, @Body() data: any) {
    return this.service.createTask({ ...data, checklist_id: checklistId });
  }

  @Patch('tasks/:id')
  @ApiOperation({ summary: 'Modifier une tâche' })
  updateTask(@Param('id') id: string, @Body() data: any) {
    return this.service.updateTask(id, data);
  }

  @Post('tasks/:id/complete')
  @ApiOperation({ summary: 'Marquer une tâche comme terminée' })
  completeTask(@Param('id') id: string, @Request() req: any) {
    return this.service.completeTask(id, req.user.id);
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  removeTask(@Param('id') id: string) {
    return this.service.removeTask(id);
  }

  // ── Employee Onboarding ─────────────────────────────────────
  @Get('employee-onboarding')
  @ApiOperation({ summary: 'Lister les onboardings employé (filtre par employeeId)' })
  findAllEmployeeOnboarding(@Query('employeeId') employeeId?: string) {
    if (employeeId) return this.service.findByEmployee(employeeId);
    return this.service.findAllEmployeeOnboarding();
  }

  @Patch('employee-onboarding/:id')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une tâche onboarding' })
  updateEmployeeOnboarding(@Param('id') id: string, @Body() data: any) {
    return this.service.updateTask(id, data);
  }

  // ── Start Onboarding ─────────────────────────────────────────
  @Post('start')
  @ApiOperation({ summary: 'Démarrer l\'onboarding pour un employé' })
  startOnboarding(@Body() data: any) {
    return this.service.startOnboarding(data);
  }
}

