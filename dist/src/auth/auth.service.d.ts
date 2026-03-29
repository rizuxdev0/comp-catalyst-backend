import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { EventEmitter2 } from 'eventemitter2';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    private eventEmitter;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService, eventEmitter: EventEmitter2);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            roles: any;
            permissions: string[];
        };
    }>;
    getMe(user: any): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        roles: any;
        permissions: string[];
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPass: string): Promise<{
        message: string;
    }>;
}
