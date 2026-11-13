import { UsersService } from '../users/users.service';
export declare class PermissionsController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findMyPermissions(req: any): Promise<string[]>;
    findAll(): Promise<import("./entities/permission.entity").Permission[]>;
    findRolePermissions(): Promise<Record<string, string[]>>;
    toggleRolePermission(role: string, permissionId: string, granted: boolean): Promise<void>;
    findUserExtraPermissions(userId: string): Promise<import("./entities/user-extra-permission.entity").UserExtraPermission[]>;
    grantUserPermission(userId: string, permissionId: string, expiresAt?: Date): Promise<import("./entities/user-extra-permission.entity").UserExtraPermission>;
    revokeUserPermission(userId: string, permissionId: string): Promise<void>;
    exportPermissions(): Promise<any>;
    importPermissions(mapping: Record<string, string[]>): Promise<void>;
}
