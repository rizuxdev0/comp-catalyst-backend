import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MedicalService } from './medical.service';

@ApiTags('Medical')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('health-safety/medical-assistances')
export class MedicalController {
  constructor(private readonly service: MedicalService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les assistances médicales' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Assistances médicales d\'un employé' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une assistance médicale' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une demande d\'assistance médicale' })
  create(@Body() data: any, @Request() req: any) {
    return this.service.create({ ...data, created_by: req.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une assistance médicale' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approuver une assistance médicale' })
  approve(
    @Param('id') id: string,
    @Body() body: { amount_approved: number },
    @Request() req: any,
  ) {
    return this.service.approve(id, req.user.id, body.amount_approved);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Rejeter une assistance médicale' })
  reject(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.service.reject(id, body.reason);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une assistance médicale' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
