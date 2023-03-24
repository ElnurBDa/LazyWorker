import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    addInterest(req: any): Promise<import("./user.entity").User>;
    removeInterest(req: any): Promise<import("./user.entity").User>;
    getInterests(req: any): Promise<string[]>;
    getUser(req: any): Promise<import("./user.entity").User>;
}
