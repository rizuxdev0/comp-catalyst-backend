import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpensesService } from './expenses.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all company expense claims' })
  async findAll() {
    return this.expensesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new organizational expense claim' })
  async create(@Body() data: any) {
    return this.expensesService.create(data);
  }

  @Patch(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Update an organizational expense claim' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.expensesService.update(id, data);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @ApiOperation({ summary: 'Delete an organizational expense claim' })
  async remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }

  @Get('my-claims')
  @ApiOperation({ summary: 'Get current user\'s expense claims' })
  async getMyClaims(@Request() req: any) {
    // Assuming user is linked to employee, we'd find employeeId first
    // For now, let's assume we have it in user object or similar mapping
    return this.expensesService.findByEmployee(req.user.employeeId);
  }
}
