import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { getRequestContext } from '../common/request-context';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
  ) {}

  /**
   * Persists an audit log entry. Automatically enriches the entry with
   * the client IP address and user agent from the current request context
   * (via AsyncLocalStorage), unless already provided by the caller.
   */
  @OnEvent('audit.log')
  async log(data: Partial<AuditLog>): Promise<AuditLog> {
    const { ipAddress, userAgent } = getRequestContext();

    const entry = this.auditRepository.create({
      ...data,
      // Use caller-provided values if present, otherwise use request context
      ipAddress: data.ipAddress || ipAddress,
      userAgent: data.userAgent || userAgent,
    });
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

