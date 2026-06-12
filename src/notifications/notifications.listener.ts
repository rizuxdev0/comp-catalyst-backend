import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from './notifications.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent('leave.updated')
  async handleLeaveUpdated(payload: { userId: string; status: string; leaveType: string; startDate: string }) {
    const { userId, status, leaveType, startDate } = payload;
    
    let title = '';
    let message = '';
    let type = 'info';

    if (status === 'approved') {
      title = 'Congé approuvé';
      message = `Votre demande de congé (${leaveType}) débutant le ${startDate} a été approuvée.`;
      type = 'success';
    } else if (status === 'rejected') {
      title = 'Congé refusé';
      message = `Votre demande de congé (${leaveType}) débutant le ${startDate} a été refusée.`;
      type = 'error';
    }

    if (title) {
      // 1. In-app
      await this.notificationsService.create({
        userId,
        title,
        message,
        type,
        category: 'leave',
      });

      // 2. Email (transactionnel)
      try {
        const body = `<h2>${title}</h2><p>${message}</p>`;
        this.logger.log(`Transactional email would be sent to user ${userId}: ${title}`);
      } catch (err) {
        this.logger.error(`Failed to send transactional email to ${userId}`, err);
      }
    }
  }

  @OnEvent('leave.created')
  async handleLeaveCreated(payload: { adminIds: string[]; employeeName: string; leaveType: string; startDate: string }) {
    const { adminIds, employeeName, leaveType, startDate } = payload;
    
    const title = 'Nouvelle demande de congé';
    const message = `${employeeName} a effectué une nouvelle demande de congé (${leaveType}) débutant le ${new Date(startDate).toLocaleDateString()}.`;
    
    // Notify all admins and managers
    for (const adminId of adminIds) {
      await this.notificationsService.create({
        userId: adminId,
        title,
        message,
        type: 'info',
        category: 'leave',
      });
    }
  }

  @OnEvent('certificate.created')
  async handleCertificateCreated(payload: { adminIds: string[]; employeeName: string; certType: string }) {
    const { adminIds, employeeName, certType } = payload;
    
    // Convert generic technical types to user-friendly names
    const typeMap: Record<string, string> = {
      'WORK_CERTIFICATE': 'Attestation de travail',
      'SALARY_CERTIFICATE': 'Attestation de salaire',
      'EMPLOYMENT_LETTER': 'Lettre d\'emploi',
      'EXPERIENCE_CERTIFICATE': 'Certificat d\'expérience',
      'BANK_DOMICILIATION': 'Attestation de domiciliation bancaire'
    };
    
    const friendlyType = typeMap[certType] || certType;

    const title = 'Nouvelle demande de document';
    const message = `${employeeName} a effectué une nouvelle demande pour : ${friendlyType}.`;
    
    for (const adminId of adminIds) {
      await this.notificationsService.create({
        userId: adminId,
        title,
        message,
        type: 'info',
        category: 'document',
      });
    }
  }

  @OnEvent('certificate.updated')
  async handleCertificateUpdated(payload: { userId: string; status: string; certType: string }) {
    const { userId, status, certType } = payload;
    
    const typeMap: Record<string, string> = {
      'WORK_CERTIFICATE': 'Attestation de travail',
      'SALARY_CERTIFICATE': 'Attestation de salaire',
      'EMPLOYMENT_LETTER': 'Lettre d\'emploi',
      'EXPERIENCE_CERTIFICATE': 'Certificat d\'expérience',
      'BANK_DOMICILIATION': 'Attestation de domiciliation bancaire'
    };
    
    const friendlyType = typeMap[certType] || certType;
    
    let title = '';
    let message = '';
    let type = 'info';

    if (status === 'ready') {
      title = 'Document disponible';
      message = `Votre demande pour le document "${friendlyType}" est prête. Vous pouvez la télécharger.`;
      type = 'success';
    } else if (status === 'rejected') {
      title = 'Demande de document refusée';
      message = `Votre demande pour le document "${friendlyType}" a été refusée.`;
      type = 'error';
    } else if (status === 'processing') {
      title = 'Demande de document en cours';
      message = `Votre demande pour le document "${friendlyType}" est actuellement en cours de traitement.`;
      type = 'info';
    }

    if (title) {
      await this.notificationsService.create({
        userId,
        title,
        message,
        type,
        category: 'document',
      });
    }
  }

  @OnEvent('payroll.finalized')
  async handlePayrollFinalized(payload: { userId: string; month: string; year: number }) {
    const { userId, month, year } = payload;
    
    await this.notificationsService.create({
      userId,
      title: 'Bulletin disponible',
      message: `Votre bulletin de paie pour ${month} ${year} est désormais disponible dans votre portail.`,
      type: 'success',
      category: 'payroll',
    });
  }

  @OnEvent('contract.expiring')
  async handleContractExpiring(payload: { userId: string; employeeName: string; daysLeft: number; type: string }) {
    const { userId, employeeName, daysLeft, type } = payload;
    
    await this.notificationsService.create({
      userId, // Manager or HR
      title: `Alerte Contrat: ${employeeName}`,
      message: `Le contrat (${type}) de ${employeeName} expire dans ${daysLeft} jours.`,
      type: 'warning',
      category: 'contract',
    });
  }
}
