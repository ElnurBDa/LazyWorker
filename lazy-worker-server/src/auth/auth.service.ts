/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    let interests = user.interests.split('_');
    interests = interests ? interests : [];
    // console.log(`[AuthService] validateUser`, user);
    return { interests, ...user };
  }

  async login(user: any): Promise<any> {
    const interests = user.interests.split('_');
    const payload = {
      email: user.email,
      name: user.name,
      interests: interests ? interests : [],
    };
    // console.log(`[AuthService] login`, payload);
    return {
      userId: user.userId,
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
      interests: interests ? interests : [],
    };
  }

  async register(req: any): Promise<number> {
    const user = await this.usersService.addUser(req);
    // let interests = user.interests.split('_');
    // interests = interests ? interests : [];
    // console.log(`[AuthService] register`, user);
    this.mailService.sendMail(user.email,user.otp);
    return 1;
  }

  async confirm(email: string, otp: number): Promise<boolean> {
    const user = await this.usersService.findOneByUserEmail(email);
    if (otp == user.otp) {
      user.isEmailConfirmed = true;
      await this.usersService.confirmEmail(user)
      return true;
    }
    return false;
  }
}
