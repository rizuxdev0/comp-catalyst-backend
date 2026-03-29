import { User } from './user.entity';
export declare enum AppRole {
    ADMIN = "admin",
    MANAGER = "manager",
    EMPLOYEE = "employee"
}
export declare class UserRole {
    id: string;
    userId: string;
    user: User;
    role: AppRole;
    createdAt: Date;
    updatedAt: Date;
}
