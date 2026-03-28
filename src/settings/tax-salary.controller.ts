import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TaxSalaryService } from './tax-salary.service';

@ApiTags('tax-salary-settings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class TaxSalaryController {
  constructor(private readonly svc: TaxSalaryService) {}

  // ======= TAX SETTINGS =======
  @Get('country-tax-settings')
  @ApiOperation({ summary: 'List tax settings' })
  getTaxSettings() { return this.svc.findAllTaxSettings(); }

  @Post('country-tax-settings')
  createTaxSetting(@Body() data: any) { return this.svc.createTaxSetting(data); }

  @Patch('country-tax-settings/:id')
  updateTaxSetting(@Param('id') id: string, @Body() data: any) { return this.svc.updateTaxSetting(id, data); }

  @Delete('country-tax-settings/:id')
  deleteTaxSetting(@Param('id') id: string) { return this.svc.deleteTaxSetting(id); }

  // ======= SALARY GRID =======
  @Get('salary-grid')
  getSalaryGrid() { return this.svc.findAllSalaryGrid(); }

  @Post('salary-grid')
  createSalaryGrid(@Body() data: any) { return this.svc.createSalaryGrid(data); }

  @Patch('salary-grid/:id')
  updateSalaryGrid(@Param('id') id: string, @Body() data: any) { return this.svc.updateSalaryGrid(id, data); }

  @Delete('salary-grid/:id')
  deleteSalaryGrid(@Param('id') id: string) { return this.svc.deleteSalaryGrid(id); }
}
