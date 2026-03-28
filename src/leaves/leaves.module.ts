import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { CompanySettings } from '../settings/entities/company-settings.entity';
import { ApprovalsModule } from '../approvals/approvals.module';
import { AuditModule } from '../audit/audit.module';

import { LeavesListener } from './leaves.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveRequest, LeaveType, LeaveBalance, CompanySettings]),
    ApprovalsModule,
    AuditModule,
  ],
  controllers: [LeavesController],
  providers: [LeavesService, LeavesListener],
  exports: [LeavesService],
})
export class LeavesModule {}
