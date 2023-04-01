import { User } from './user.entity';
export declare class UsersService {
    private readonly repository;
    addUser(user: any): Promise<User>;
    findOneByUserEmail(email: string): Promise<User | undefined>;
    getInterests(email: string): Promise<string[] | undefined>;
    validateUser(email: string, password: string): Promise<User | undefined>;
    addInterest(interest: string, email: string): Promise<User | undefined>;
    removeInterest(interest: string, email: string): Promise<User | undefined>;
    confirmEmail(user: User): Promise<User>;
}
