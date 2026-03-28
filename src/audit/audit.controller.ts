import { Controller, Get, Post, Body, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuditService } from './audit.service';
import { AuditLog } from './entities/audit-log.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('audit-reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('audit-reports')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Roles(AppRole.ADMIN)
  @Get('audit-logs')
  @ApiOperation({ summary: 'Get system audit logs (Admin only)' })
  @ApiQuery({ name: 'entityType', required: false })
  @ApiQuery({ name: 'userId', required: false })
  async findAll(@Query('entityType') entityType?: string, @Query('userId') userId?: string) {
    const filters: any = {};
    if (entityType) filters.entityType = entityType;
    if (userId) filters.userId = userId;
    
    const logs = await this.auditService.findAll(filters);
    
    // Map to the frontend expected format
    return logs.map(log => ({
      id: log.id,
      userEmail: log.user?.email,
      userName: log.user ? `${log.user.firstName || ''} ${log.user.lastName || ''}`.trim() || log.user.email : 'Système',
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      entityName: log.entityName,
      previousValues: log.oldValues,
      newValues: log.newValues,
      createdAt: log.createdAt,
    }));
  }

  @Post('log')
  @ApiOperation({ summary: 'Manual audit log entry' })
  async create(@Body() logData: Partial<AuditLog>, @Req() req: any) {
    if (req.user && req.user.id) {
      logData.userId = req.user.id;
    }
    return this.auditService.log(logData);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('mass-export')
  @ApiOperation({ summary: 'Generate a report reference' })
  async exportReport(@Query('type') type: string) {
    // Logic for actual CSV/PDF generation reference
    return {
      report_url: `https://reports.example.com/${type}-report-${Date.now()}.csv`,
      generated_at: new Date(),
      status: 'success',
    };
  }
}
