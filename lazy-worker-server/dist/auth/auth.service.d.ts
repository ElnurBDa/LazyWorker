import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<any>;
    register(req: any): Promise<number>;
    confirm(email: string, otp: number): Promise<boolean>;
}
