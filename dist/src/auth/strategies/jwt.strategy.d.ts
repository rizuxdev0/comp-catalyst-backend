import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        permissions: string[];
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        emailVerified: boolean;
        mustChangePassword: boolean;
        passwordStatus: import("../../users/entities/user.entity").PasswordStatus;
        temporaryPasswordExpiresAt: Date;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
        extraPermissions: string[];
        resetPasswordToken: string;
        resetPasswordExpiresAt: Date;
        roles: import("../../users/entities/user-role.entity").UserRole[];
    }>;
}
export {};
