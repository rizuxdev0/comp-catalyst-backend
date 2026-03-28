import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeparturesService } from './departures.service';

@ApiTags('Departures')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('departures')
export class DeparturesController {
  constructor(private readonly service: DeparturesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les départs' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un départ' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Enregistrer un départ' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un départ' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Finaliser un départ' })
  complete(@Param('id') id: string) {
    return this.service.complete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un départ' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
