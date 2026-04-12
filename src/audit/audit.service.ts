import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
  ) {}

  @OnEvent('audit.log')
  async log(data: Partial<AuditLog>): Promise<AuditLog> {
    const entry = this.auditRepository.create(data);
    return this.auditRepository.save(entry);
  }

  async findAll(filters: any): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: filters,
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 100, // Limit for performance
    });
  }

  async clearUserReferences(userId: string): Promise<void> {
    await this.auditRepository.createQueryBuilder()
      .update(AuditLog)
      .set({ userId: null } as any)
      .where("user_id = :userId", { userId })
      .execute();
  }
}
