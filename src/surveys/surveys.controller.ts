import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SurveysService } from './surveys.service';

@ApiTags('Surveys')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('surveys')
export class SurveysController {
  constructor(private readonly service: SurveysService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les sondages' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un sondage' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Statistiques d\'un sondage' })
  getStats(@Param('id') id: string) {
    return this.service.getStats(id);
  }

  @Get(':id/responses')
  @ApiOperation({ summary: 'Réponses d\'un sondage' })
  getResponses(@Param('id') id: string) {
    return this.service.getResponses(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un sondage' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un sondage' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activer un sondage' })
  activate(@Param('id') id: string) {
    return this.service.activate(id);
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Fermer un sondage' })
  close(@Param('id') id: string) {
    return this.service.close(id);
  }

  @Post(':id/respond')
  @ApiOperation({ summary: 'Soumettre une réponse' })
  respond(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    return this.service.submitResponse(id, {
      ...data,
      respondent_id: data.anonymous ? null : req.user.id,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un sondage' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
