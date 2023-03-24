import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    register(req: any): Promise<import("../users/user.entity").User>;
    getProfile(req: any): any;
}
