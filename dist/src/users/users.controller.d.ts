import { UsersService } from './users.service';
import { AppRole } from './entities/user-role.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    create(userData: any): Promise<any>;
    updateRole(id: string, role: AppRole): Promise<import("./entities/user-role.entity").UserRole>;
    remove(id: string): Promise<void>;
    updateProfile(req: any, data: any): Promise<import("./entities/user.entity").User>;
    changePassword(req: any, data: any): Promise<{
        message: string;
    }>;
}
