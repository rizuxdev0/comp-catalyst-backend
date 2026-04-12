import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateRequest, CertificateRequestStatus } from './entities/certificate-request.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(CertificateRequest)
    private readonly certRepo: Repository<CertificateRequest>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
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
    return this.certRepo.save(request);
  }

  async updateStatus(id: string, status: CertificateRequestStatus, processedBy?: string, rejectionReason?: string): Promise<CertificateRequest> {
    const cert = await this.certRepo.findOne({ where: { id } });
    if (!cert) throw new NotFoundException('Demande non trouvée');
    cert.status = status;
    if (processedBy) cert.processedBy = processedBy;
    if (rejectionReason) cert.rejectionReason = rejectionReason;
    return this.certRepo.save(cert);
  }
}
