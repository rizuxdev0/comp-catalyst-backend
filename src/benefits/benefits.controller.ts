import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BenefitsService } from './benefits.service';

@ApiTags('Benefits')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('benefits')
export class BenefitsController {
  constructor(private readonly service: BenefitsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les avantages sociaux' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Avantages d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un avantage' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un avantage social' })
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un avantage social' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un avantage social' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
