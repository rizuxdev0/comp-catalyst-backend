import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EvaluationsService } from './evaluations.service';

@ApiTags('Evaluations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly service: EvaluationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les évaluations' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Évaluations d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une évaluation' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une évaluation' })
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une évaluation' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Finaliser une évaluation' })
  complete(@Param('id') id: string, @Body() body: { overall_rating: number }) {
    return this.service.complete(id, body.overall_rating);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une évaluation' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
