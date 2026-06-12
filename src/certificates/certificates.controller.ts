import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CertificatesService } from './certificates.service';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('certificates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get('my-requests')
  @ApiOperation({ summary: 'Get current employee certificate requests' })
  @ApiResponse({ status: 200, type: [CertificateRequest] })
  async findMyRequests(@Request() req) {
    return this.certificatesService.findMyRequests(req.user.id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get()
  @ApiOperation({ summary: 'Get all certificate requests (admin/manager)' })
  @ApiResponse({ status: 200, type: [CertificateRequest] })
  async findAll() {
    return this.certificatesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Submit a certificate request' })
  @ApiResponse({ status: 201, type: CertificateRequest })
  async create(@Request() req, @Body() data: Partial<CertificateRequest>) {
    return this.certificatesService.create(req.user.id, data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch(':id/process')
  @ApiOperation({ summary: 'Update certificate request status' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: CertificateRequestStatus,
    @Body('rejectionReason') rejectionReason?: string,
    @Body('content') content?: string,
  ) {
    return this.certificatesService.updateStatus(id, status, req.user.id, rejectionReason, content);
  }
}
