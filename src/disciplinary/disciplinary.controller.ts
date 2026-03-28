import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request, Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DisciplinaryService } from './disciplinary.service';

@ApiTags('Disciplinary')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('disciplinary/actions')
export class DisciplinaryController {
  constructor(private readonly service: DisciplinaryService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les actions disciplinaires' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Actions disciplinaires d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une action disciplinaire' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une action disciplinaire' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une action disciplinaire' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une action disciplinaire' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
