import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountingService } from './accounting.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('mappings')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Get all accounting mappings' })
  async findAllMappings() {
    return this.accountingService.findAllMappings();
  }

  @Post('mappings')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Create accounting mapping' })
  async createMapping(@Body() data: any) {
    return this.accountingService.createMapping(data);
  }

  @Patch('mappings/:id')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Update accounting mapping' })
  async updateMapping(@Param('id') id: string, @Body() data: any) {
    return this.accountingService.updateMapping(id, data);
  }

  @Get('journal')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Génère les écritures comptables' })
  generateJournal(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('establishmentId') establishmentId?: string,
  ) {
    return this.accountingService.generateJournalEntries(month, year, establishmentId);
  }

  @Get('consolidation')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Rapport consolidé par établissement' })
  getConsolidation(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.accountingService.getConsolidatedReport(month, year);
  }

  @Get('export')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Export CSV pour logiciel comptable' })
  async export(
    @Res() res,
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('format') format: 'sage' | 'ebp' | 'generic' = 'generic',
    @Query('establishmentId') establishmentId?: string,
  ) {
    const csv = await this.accountingService.exportToCSV(month, year, format, establishmentId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=OD_Paie_${year}_${month}.csv`);
    return res.send(csv);
  }
}
