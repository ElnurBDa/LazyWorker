import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    register(req: any): Promise<number>;
    confirm(req: any): Promise<boolean>;
    getProfile(req: any): any;
}
