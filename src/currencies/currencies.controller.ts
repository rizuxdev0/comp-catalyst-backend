import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Currencies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.currenciesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.currenciesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }

  @Post(':id/set-default')
  setDefault(@Param('id') id: string) {
    return this.currenciesService.setDefault(id);
  }
}
