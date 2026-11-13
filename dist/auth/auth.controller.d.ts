import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            roles: any;
            permissions: string[];
            passwordStatus: any;
            mustChangePassword: any;
        };
    }>;
    refresh(req: any, res: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(res: any): Promise<{
        success: boolean;
    }>;
    getProfile(req: any): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        roles: any;
        permissions: string[];
        passwordStatus: any;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPass: string): Promise<{
        message: string;
    }>;
}
