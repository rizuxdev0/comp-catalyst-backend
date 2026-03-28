import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { HrDocumentsService } from '../hr-documents/hr-documents.service';

@ApiTags('employees')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly hrDocumentsService: HrDocumentsService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user employee profile' })
  async findProfile(@Request() req) {
    return this.employeesService.findByUserId(req.user.id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  async create(@Body() createEmployeeDto: Partial<Employee>) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  async findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  async findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee' })
  async update(@Param('id') id: string, @Body() updateData: Partial<Employee>) {
    return this.employeesService.update(id, updateData);
  }

  @Roles(AppRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }

  @Get(':id/career-history')
  @ApiOperation({ summary: 'Get career history for an employee' })
  async findCareerHistory(@Param('id') id: string) {
    return this.employeesService['careerHistoryRepository'].find({
      where: { employeeId: id },
      order: { changeDate: 'DESC' },
    });
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post(':id/career-history')
  @ApiOperation({ summary: 'Add a career history record' })
  async addCareerHistory(@Param('id') id: string, @Body() data: any) {
    return this.employeesService['careerHistoryRepository'].save(
      this.employeesService['careerHistoryRepository'].create({
        ...data,
        employeeId: id,
      })
    );
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Get all HR documents for an employee' })
  async findDocuments(@Param('id') id: string) {
    return this.hrDocumentsService.findAll(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post(':id/documents')
  @ApiOperation({ summary: 'Add an HR document reference' })
  async addDocument(@Param('id') id: string, @Body() data: any) {
    return this.hrDocumentsService.create({ ...data, employeeId: id });
  }
}
