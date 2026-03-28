import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SettingsService } from '../settings/settings.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {}

  async createTransporter() {
    const settings = await this.settingsService.getSmtpSettingsWithPassword();

    if (!settings || !settings.isActive) {
      this.logger.warn('SMTP settings not configured or not active');
      return null;
    }

    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: {
        user: settings.user,
        pass: settings.pass,
      },
    });

    return { transporter, settings };
  }

  async sendMail(to: string, subject: string, template: string, context: any) {
    try {
      const result = await this.createTransporter();
      if (!result) return;
      
      const { transporter, settings } = result;

      const info = await transporter.sendMail({
        from: `"${settings.fromName}" <${settings.fromEmail}>`,
        to,
        subject,
        // For now simple text or we can use the Template engine
        html: template, // Replace with template engine later if needed
      });

      this.logger.log(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw error;
    }
  }

  async testConnection(smtpData: any) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpData.host,
        port: smtpData.port,
        secure: smtpData.secure,
        auth: {
          user: smtpData.user,
          pass: smtpData.pass,
        },
      });

      await transporter.verify();
      return { success: true, message: 'Connection SMTP réussie' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
