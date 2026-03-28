import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('positions')
@Controller('positions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau poste' })
  create(@Body() createPositionDto: any) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste de tous les postes' })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un poste' })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un poste' })
  update(@Param('id') id: string, @Body() updatePositionDto: any) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un poste' })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}
