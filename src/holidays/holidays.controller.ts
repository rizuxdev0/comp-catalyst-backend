import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HolidaysService } from './holidays.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get()
  @ApiOperation({ summary: 'Get all company holidays' })
  async findAll(@Query('year') year?: number) {
    if (year) return this.holidaysService.findByYear(year);
    return this.holidaysService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Create a new organizational holiday' })
  async create(@Body() data: any) {
    return this.holidaysService.create(data);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Update an organizational holiday' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.holidaysService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Delete an organizational holiday' })
  async remove(@Param('id') id: string) {
    return this.holidaysService.remove(id);
  }
}
