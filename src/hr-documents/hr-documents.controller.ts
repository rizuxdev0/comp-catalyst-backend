import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HrDocumentsService } from './hr-documents.service';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('HR Documents')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('hr-documents')
export class HrDocumentsController {
  constructor(private readonly documentsService: HrDocumentsService) {}

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a document reference' })
  async create(@Body() createDto: Partial<HRDocument>) {
    return this.documentsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get documents (all or filter by employee)' })
  async findAll(@Query('employeeId') employeeId?: string) {
    return this.documentsService.findAll(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  async update(@Param('id') id: string, @Body() updateData: Partial<HRDocument>) {
    return this.documentsService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  async remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }

  @Get(':id/signatures')
  @ApiOperation({ summary: 'Get signatures for a document' })
  async getSignatures(@Param('id') id: string) {
    return this.documentsService.fetchSignatures(id);
  }

  @Post('signatures')
  @ApiOperation({ summary: 'Add a electronic signature' })
  async addSignature(@Body() data: Partial<DocumentSignature>) {
    return this.documentsService.addSignature(data);
  }

  @Patch(':id/sign')
  @ApiOperation({ summary: 'Mark a document as signed' })
  async sign(@Param('id') id: string) {
    return this.documentsService.markAsSigned(id);
  }
}
