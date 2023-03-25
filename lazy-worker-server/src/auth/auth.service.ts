/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    let interests = user.interests.split('_');
    interests = interests ? interests : [];
    console.log(`[AuthService] validateUser`, user);
    return { interests, ...user };
  }

  async login(user: any): Promise<any> {
    const interests = user.interests.split('_');
    const payload = {
      email: user.email,
      name: user.name,
      interests: interests ? interests : [],
    };
    console.log(`[AuthService] login`, payload);
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
      interests: interests ? interests : [],
    };
  }

  async register(req: any): Promise<User | undefined> {
    const user = await this.usersService.addUser(req);
    let interests = user.interests.split('_');
    interests = interests ? interests : [];
    console.log(`[AuthService] register`, user);
    return { interests, ...user };
  }
}
