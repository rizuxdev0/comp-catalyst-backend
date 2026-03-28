import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AccidentsService } from './accidents.service';

@ApiTags('Accidents')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('health-safety/work-accidents')
export class AccidentsController {
  constructor(private readonly service: AccidentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les accidents de travail' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Accidents d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un accident' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Déclarer un accident de travail' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un accident' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un accident' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
