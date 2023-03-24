/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    return await this.usersService.validateUser(email, password);
  }

  async login(user: any): Promise<any> {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`);
    const payload = {
      email: user.email,
      name: user.name,
      interests: user.interests,
    };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
      interests: user.interests,
    };
  }

  async register(user: any): Promise<IUser | undefined> {
    console.log(`[AuthService] register: user=${JSON.stringify(user)}`);
    return this.usersService.addUser(user);
  }
}
