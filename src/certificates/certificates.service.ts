import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(CertificateRequest)
    private readonly certRepo: Repository<CertificateRequest>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly eventEmitter: EventEmitter2,
    private readonly dataSource: DataSource,
  ) {}

  async findMyRequests(userId: string): Promise<CertificateRequest[]> {
    const employee = await this.employeeRepo.findOne({ where: { userId } });
    if (!employee) return [];
    return this.certRepo.find({
      where: { employeeId: employee.id },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<CertificateRequest[]> {
    return this.certRepo.find({
      relations: ['employee'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(userId: string, data: Partial<CertificateRequest>): Promise<CertificateRequest> {
    const employee = await this.employeeRepo.findOne({ where: { userId } });
    if (!employee) {
      throw new NotFoundException('Aucun profil employé lié à votre compte');
    }
    const request = this.certRepo.create({
      ...data,
      employeeId: employee.id,
      status: CertificateRequestStatus.PENDING,
    });
    const saved = await this.certRepo.save(request);

    try {
      const managersAndAdmins = await this.dataSource.query(
        `SELECT DISTINCT ur.user_id as id FROM user_roles ur WHERE ur.role IN ('admin', 'manager')`
      );
      this.eventEmitter.emit('certificate.created', {
        adminIds: managersAndAdmins.map((u: any) => u.id),
        employeeName: `${employee.first_name} ${employee.last_name}`,
        certType: saved.type,
      });
    } catch(e) {
      console.error('Failed to dispatch certificate.created event', e);
    }

    return saved;
  }

  async updateStatus(id: string, status: CertificateRequestStatus, processedBy?: string, rejectionReason?: string, content?: string): Promise<CertificateRequest> {
    const cert = await this.certRepo.findOne({ where: { id }, relations: ['employee'] });
    if (!cert) throw new NotFoundException('Demande non trouvée');
    cert.status = status;
    if (processedBy) cert.processedBy = processedBy;
    if (rejectionReason !== undefined) cert.rejectionReason = rejectionReason;
    if (content !== undefined) cert.content = content;
    const saved = await this.certRepo.save(cert);

    try {
      if (cert.employee && cert.employee.userId) {
        this.eventEmitter.emit('certificate.updated', {
          userId: cert.employee.userId,
          status: saved.status,
          certType: saved.type,
        });
      }
    } catch(e) {
      console.error('Failed to dispatch certificate.updated event', e);
    }

    return saved;
  }
}
