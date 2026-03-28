import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BanksService } from './banks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Banks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  findAll() {
    return this.banksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banksService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.banksService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.banksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banksService.remove(id);
  }

  @Post(':id/set-company')
  setCompanyBank(@Param('id') id: string) {
    return this.banksService.setCompanyBank(id);
  }
}
