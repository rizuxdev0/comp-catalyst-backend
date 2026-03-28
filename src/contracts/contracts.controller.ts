import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';
import { ContractType } from './entities/contract-type.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('contracts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'The contract has been successfully created.', type: Contract })
  async create(@Body() createContractDto: Partial<Contract>) {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contracts' })
  @ApiQuery({ name: 'employeeId', required: false })
  @ApiResponse({ status: 200, description: 'Return all contracts / filtered by employee.', type: [Contract] })
  async findAll(@Query('employeeId') employeeId?: string) {
    return this.contractsService.findAll(employeeId);
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get expiring active contracts within 30 days' })
  @ApiResponse({ status: 200, description: 'Return expiring contracts.', type: [Contract] })
  async findExpiring() {
    return this.contractsService.findExpiring();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  @ApiResponse({ status: 200, description: 'Return a single contract.', type: Contract })
  async findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiResponse({ status: 200, description: 'The contract has been successfully updated.', type: Contract })
  async update(@Param('id') id: string, @Body() updateData: Partial<Contract>) {
    return this.contractsService.update(id, updateData);
  }

  @Roles(AppRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract' })
  @ApiResponse({ status: 204, description: 'The contract has been successfully deleted.' })
  async remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }

  // CONTRACT TYPES
  @Get('types/all')
  @ApiOperation({ summary: 'Get all contract types' })
  @ApiResponse({ status: 200, type: [ContractType] })
  async findContractTypes() {
    return this.contractsService.findContractTypes();
  }

  @Get('types/:id')
  @ApiOperation({ summary: 'Get contract type by ID' })
  @ApiResponse({ status: 200, type: ContractType })
  async findContractType(@Param('id') id: string) {
    return this.contractsService.findContractType(id);
  }

  @Roles(AppRole.ADMIN)
  @Post('types')
  @ApiOperation({ summary: 'Create a new contract type' })
  @ApiResponse({ status: 201, type: ContractType })
  async createType(@Body() data: Partial<ContractType>) {
    return this.contractsService.createContractType(data);
  }

  @Roles(AppRole.ADMIN)
  @Patch('types/:id')
  @ApiOperation({ summary: 'Update a contract type' })
  @ApiResponse({ status: 200, type: ContractType })
  async updateType(@Param('id') id: string, @Body() data: Partial<ContractType>) {
    return this.contractsService.updateContractType(id, data);
  }

  @Roles(AppRole.ADMIN)
  @Delete('types/:id')
  @ApiOperation({ summary: 'Delete a contract type' })
  @ApiResponse({ status: 204 })
  async removeType(@Param('id') id: string) {
    return this.contractsService.removeContractType(id);
  }
}
