import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { PaymentStatus } from './entities/payment.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  async findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  async create(@Body() data: any) {
    return this.paymentsService.create(data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update payment status' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: PaymentStatus,
    @Body('additionalData') additionalData?: any,
  ) {
    return this.paymentsService.updateStatus(id, status, additionalData);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post(':id/retry')
  @ApiOperation({ summary: 'Retry a failed payment' })
  async retry(@Param('id') id: string) {
    return this.paymentsService.retry(id);
  }

  @Roles(AppRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  async remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('bulk')
  @ApiOperation({ summary: 'Create bulk payments' })
  async createBulk(@Body('employeeIds') employeeIds: string[], @Body('data') data: any) {
    return this.paymentsService.createBulk(employeeIds, data);
  }
}
