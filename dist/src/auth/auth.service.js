"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const eventemitter2_1 = require("eventemitter2");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailService, eventEmitter) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.eventEmitter = eventEmitter;
    }
    async validateUser(email, pass) {
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
    async login(user) {
        const permissions = await this.usersService.getEffectivePermissions(user.id);
        const roles = user.roles?.map((r) => r.role) || [];
        const payload = {
            sub: user.id,
            email: user.email,
            roles: roles
        };
        const response = {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
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
    async refresh(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findOne(payload.sub);
            if (!user || !user.isActive)
                throw new common_1.UnauthorizedException('User inactive or not found');
            const permissions = await this.usersService.getEffectivePermissions(user.id);
            const roles = user.roles?.map((r) => r.role) || [];
            const newPayload = {
                sub: user.id,
                email: user.email,
                roles: roles
            };
            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
            };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async getMe(user) {
        const permissions = await this.usersService.getEffectivePermissions(user.id);
        const roles = user.roles?.map((r) => r.role) || [];
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: roles,
            permissions: permissions
        };
    }
    async forgotPassword(email) {
        const user = await this.usersService.findOne(email);
        if (!user) {
            return { message: 'Si cet email correspond à un compte, un lien de réinitialisation vous a été envoyé.' };
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000);
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
    async resetPassword(token, newPass) {
        const user = await this.usersService.findByResetToken(token);
        if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Le jeton de réinitialisation est invalide ou a expiré.');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        eventemitter2_1.EventEmitter2])
], AuthService);
//# sourceMappingURL=auth.service.js.map