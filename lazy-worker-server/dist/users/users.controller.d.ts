import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    addInterest(req: any): Promise<import("./users.interface").IUser>;
    removeInterest(req: any): Promise<import("./users.interface").IUser>;
    getInterests(req: any): Promise<string[]>;
    getUser(req: any): Promise<import("./users.interface").IUser>;
}
