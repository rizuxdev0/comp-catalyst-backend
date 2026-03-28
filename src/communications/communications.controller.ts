import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request, Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CommunicationsService } from './communications.service';

@ApiTags('Communications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('communications')
export class CommunicationsController {
  constructor(private readonly service: CommunicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les communications' })
  findAll(@Query('status') status?: string) {
    if (status) return this.service.findByStatus(status);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une communication' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une communication' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une communication' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publier une communication' })
  publish(@Param('id') id: string) {
    return this.service.publish(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une communication' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
