/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { IUser } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      userId: 1,
      email: 'elnur@gmail.com',
      name: 'Elnur',
      password: '$2b$10$tQcpvXg0H5DjQuI9TgLUYOdrrVawNma8PlYMSx0CrGX2XUjaIJWye', // hashed elnur
      interests: ['Certified Slave', 'backend', 'sufferings'],
      createdAt: new Date('2023-03-08'),
    },
    {
      userId: 2,
      email: 'elcan@gmail.com',
      name: 'Elcan',
      password: '$2b$10$3mGanRD0L0DsIURg15.Qtu8fyBLpFO3SHq4e/j8xxbxQsQ53oM1M2', //hashed elcan
      interests: ['frontend', 'Certified Killer', 'sufferings', 'Developer'],
      createdAt: new Date('2023-03-08'),
    },
  ];

  async addUser(user: any): Promise<IUser | undefined> {
    console.log(`[UsersService] addUser: user=${JSON.stringify(user)}`);

    if (!user.email || !user.name || !user.password) {
      throw new BadRequestException('Missing required fields');
    }
    const existingUser = this.users.find(_user => _user.email === user.email);
    if (existingUser) {
      throw new ConflictException('User with that email already exists');
    }
    const maxUserId = Math.max(...this.users.map(user => user.userId));

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;

    const newuser: IUser = {
      userId: maxUserId + 1,
      email: user.email,
      name: user.name,
      password: user.password,
      interests: [],
      createdAt: new Date(),
    };

    console.log(`[UsersService] addUser: newuser=${JSON.stringify(newuser)}`);
    this.users.push(newuser);

    return newuser;
  }

  async findOne(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  async getInterests(email: string): Promise<string[] | undefined> {
    const user = this.findOne(email);
    return (await user).interests;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );

    const user = this.users.find(user => user.email === email);

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
  ): Promise<IUser | undefined> {
    const user = await this.findOne(email);
    if (!user) return undefined;
    if (user.interests.includes(interest)) return user;
    user.interests.push(interest);
    this.userSave(user);
    return user;
  }

  async removeInterest(
    interest: string,
    email: string,
  ): Promise<IUser | undefined> {
    const user = await this.findOne(email);
    if (!user) return undefined;
    user.interests = user.interests.filter(
      userInterest => userInterest !== interest,
    );
    this.userSave(user);
    return user;
  }

  async userSave(user: IUser) {
    this.users = [
      ...this.users.filter(_user => _user.email !== user.email),
      user,
    ];
  }
}
