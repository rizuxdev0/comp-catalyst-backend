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
      // Try to get user pref and email - implementation simplified
      try {
        // Envoi email réel via le service Mail
        const body = `<h2>${title}</h2><p>${message}</p>`;
        // In a real app we'd fetch the user's email first
        // await this.mailService.sendMail(user.email, title, body, {});
        this.logger.log(`Transactional email would be sent to user ${userId}: ${title}`);
      } catch (err) {
        this.logger.error(`Failed to send transactional email to ${userId}`, err);
      }
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
