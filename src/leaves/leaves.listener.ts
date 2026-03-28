import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LeavesService } from './leaves.service';

@Injectable()
export class LeavesListener {
  constructor(private readonly leavesService: LeavesService) {}

  @OnEvent('approval.completed')
  async handleApprovalCompleted(payload: { module: string; entityId: string; userId: string }) {
    if (payload.module === 'leaves') {
      console.log(`Approval completed for leave request ${payload.entityId}`);
      await this.leavesService.approveRequest(payload.entityId, payload.userId);
    }
  }

  @OnEvent('approval.rejected')
  async handleApprovalRejected(payload: { module: string; entityId: string; userId: string }) {
    if (payload.module === 'leaves') {
      console.log(`Approval rejected for leave request ${payload.entityId}`);
      await this.leavesService.rejectRequest(payload.entityId, 'Rejeté par le workflow d\'approbation');
    }
  }
}
