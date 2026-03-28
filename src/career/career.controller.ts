import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request, Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CareerService } from './career.service';

@ApiTags('Career')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('career')
export class CareerController {
  constructor(private readonly service: CareerService) {}

  // Alias /career/history utilisé par le frontend
  @Get('history')
  @ApiOperation({ summary: 'Lister tout l\'historique carrière (alias)' })
  findAllHistory(@Query('employeeId') employeeId?: string) {
    if (employeeId) return this.service.findByEmployee(employeeId);
    return this.service.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Lister tout l\'historique carrière' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Historique carrière d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un événement carrière' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un événement carrière' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un événement carrière' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un événement carrière' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
