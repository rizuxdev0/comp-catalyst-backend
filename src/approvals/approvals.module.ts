import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';
import { ApprovalWorkflow } from './entities/approval-workflow.entity';
import { ApprovalStep } from './entities/approval-step.entity';
import { ApprovalRequest } from './entities/approval-request.entity';
import { ApprovalAction } from './entities/approval-action.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApprovalWorkflow,
      ApprovalStep,
      ApprovalRequest,
      ApprovalAction,
    ]),
  ],
  providers: [ApprovalsService],
  controllers: [ApprovalsController],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}
