import { IUser } from './users.interface';
export declare class UsersService {
    private users;
    addUser(user: any): Promise<IUser | undefined>;
    findOne(email: string): Promise<IUser | undefined>;
    getInterests(email: string): Promise<string[] | undefined>;
    validateUser(email: string, password: string): Promise<IUser | undefined>;
    addInterest(interest: string, email: string): Promise<IUser | undefined>;
    removeInterest(interest: string, email: string): Promise<IUser | undefined>;
    userSave(user: IUser): Promise<void>;
}
