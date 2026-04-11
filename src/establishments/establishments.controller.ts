import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EstablishmentService } from './establishments.service';
import { Establishment } from './entities/establishment.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('Establishments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les établissements' })
  findAll() {
    return this.establishmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un établissement' })
  findOne(@Param('id') id: string) {
    return this.establishmentService.findOne(id);
  }

  @Post()
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Créer un établissement' })
  create(@Body() data: Partial<Establishment>) {
    return this.establishmentService.create(data);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Mettre à jour un établissement' })
  update(@Param('id') id: string, @Body() data: Partial<Establishment>) {
    return this.establishmentService.update(id, data);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Supprimer un établissement' })
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(id);
  }
}
