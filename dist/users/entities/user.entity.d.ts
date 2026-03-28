import { UserRole } from './user-role.entity';
export declare enum PasswordStatus {
    ACTIVE = "active",
    MUST_CHANGE = "must_change",
    TEMPORARY = "temporary",
    EXPIRED = "expired"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    emailVerified: boolean;
    mustChangePassword: boolean;
    passwordStatus: PasswordStatus;
    temporaryPasswordExpiresAt: Date;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    extraPermissions: string[];
    resetPasswordToken: string;
    resetPasswordExpiresAt: Date;
    roles: UserRole[];
}
