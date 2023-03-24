/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async addUser(user: any): Promise<User> {
    console.log(`[UsersService] addUser: user=${JSON.stringify(user)}`);
    if (!user.email || !user.name || !user.password) {
      throw new BadRequestException('Missing required fields');
    }
    
    const newuser: User = new User();

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    
    newuser.password = hashPassword;
    newuser.email = user.email;
    newuser.name = user.name;
    newuser.interests = "";
    newuser.createdAt = new Date();
    newuser.updatedAt = newuser.createdAt;

    return this.repository.save(newuser);
  }

  async findOne(email: string): Promise<User|undefined> {
    return this.repository.findOne({where : {email:email}});
  }

  async getInterests(email: string): Promise<string[] | undefined> {
    const user = await this.findOne(email);
    console.log('[UserService] getInterests ', user.interests.split('_'))
    return user.interests.split('_');
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );

    const user = await this.findOne(email);

    if (user) {
      console.log('[UsersService] validateUser: found user', user);

      const match = await bcrypt.compare(password, user.password);
      console.log('[UsersService] validateUser: matched', match);
      if (match) {
        return { ...user, password: undefined };
      }
    }
    return undefined;
  }

  async addInterest(
    interest: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.findOne(email);
    if (!user) return undefined;
    if (user.interests.split('_').includes(interest)) return user;
    user.interests = user.interests + "_" + interest;
    return this.repository.save(user);
  }

  async removeInterest(
    interest: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.findOne(email);
    if (!user) return undefined;
    user.interests = user.interests.split('_').filter(
      userInterest => userInterest !== interest,
    ).join('_');

    return this.repository.save(user);
  }
}
