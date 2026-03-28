import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('departments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  async create(@Body() createDepartmentDto: Partial<Department>) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  async findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by ID' })
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Roles(AppRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  async update(@Param('id') id: string, @Body() updateData: Partial<Department>) {
    return this.departmentsService.update(id, updateData);
  }

  @Roles(AppRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
