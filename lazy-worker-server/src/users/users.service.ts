/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {

  private users: IUser[] = [
    {
      email: 'elnur@gmail.com',
      name: 'Elnur',
      password: 'elnur',
      interests: ['Certified Slave','backend','sufferings'],
      created_at:new Date('2023-03-08'),
    },
    {
      email: 'elcan@gmail.com',
      name: 'Elcan',
      password: 'elcan',
      interests: ['frontend','Certified Killer','sufferings','Developer'],
      created_at:new Date('2023-03-08'),
    },
  ];
  
  async addUser(user: any): Promise<IUser | undefined>{
    console.log(`[UsersService] addUser: user=${JSON.stringify(user)}`)

    if (!user.email || !user.name || !user.password) {
      throw new BadRequestException('Missing required fields');
    }
    const existingUser = this.users.find(_user => _user.email === user.email);
    if (existingUser) {
      throw new ConflictException('User with that email already exists');
    }
    const newuser: IUser = {
      email:user.email,
      name:user.name,
      password:user.password,
      interests:[],
      created_at: new Date(),
    };
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

  async validateUser(email: string, password: string): Promise<IUser | undefined> {
    console.log(`[UsersService] validateUser, email: ${email}, password: ${password}`)
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('[UsersService] validateUser: found user', user)
      return { ...user, password: undefined }
    }
    return undefined
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

  async userSave(user: IUser){
    this.users = [...this.users.filter(_user => _user.email !== user.email), user]
  }


}
