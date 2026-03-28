import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    
    this.eventEmitter.emit('audit.log', {
      action: 'login_failed',
      entityType: 'auth',
      entityName: email,
    });
    return null;
  }

  async login(user: any) {
    const permissions = await this.usersService.getEffectivePermissions(user.id);
    const roles = user.roles?.map((r: any) => r.role) || [];

    const payload = { 
      sub: user.id, 
      email: user.email,
      roles: roles
    };
    const response = {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: roles,
        permissions: permissions
      }
    };
    this.eventEmitter.emit('audit.log', {
      action: 'login_success',
      entityType: 'auth',
      userId: user.id,
      entityName: user.email,
    });
    return response;
  }

  async getMe(user: any) {
    const permissions = await this.usersService.getEffectivePermissions(user.id);
    const roles = user.roles?.map((r: any) => r.role) || [];
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles,
      permissions: permissions
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      // Pour des raisons de sécurité, on ne dit pas si l'utilisateur existe ou non
      return { message: 'Si cet email correspond à un compte, un lien de réinitialisation vous a été envoyé.' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 heure

    await this.usersService.updateResetToken(user.id, token, expires);

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
    
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Réinitialisation de mot de passe</h2>
          <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte <strong>PayrollPro</strong>.</p>
          <p>Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe :</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Réinitialiser mon mot de passe</a>
          </div>
          <p style="font-size: 0.9em; color: #666;">Ce lien est valable 1 heure.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #999;">Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.</p>
        </div>
      `;

    await this.mailService.sendMail(user.email, 'Réinitialisation de votre mot de passe', html, {});
    
    this.eventEmitter.emit('audit.log', {
      action: 'forgot_password',
      entityType: 'auth',
      userId: user.id,
      entityName: user.email,
    });

    return { message: 'Un email de réinitialisation a été envoyé.' };
  }

  async resetPassword(token: string, newPass: string) {
    const user = await this.usersService.findByResetToken(token);
    
    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < new Date()) {
      throw new BadRequestException('Le jeton de réinitialisation est invalide ou a expiré.');
    }

    const passwordHash = await bcrypt.hash(newPass, 10);
    await this.usersService.updatePasswordAndClearResetToken(user.id, passwordHash);

    this.eventEmitter.emit('audit.log', {
      action: 'reset_password',
      entityType: 'auth',
      userId: user.id,
      entityName: user.email,
    });

    return { message: 'Votre mot de passe a été réinitialisé avec succès.' };
  }
}
