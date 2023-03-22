"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                userId: 1,
                email: 'elnur@gmail.com',
                name: 'Elnur',
                password: 'elnur',
                interests: ['Certified Slave', 'backend', 'sufferings'],
                created_at: new Date('2023-03-08'),
            },
            {
                userId: 2,
                email: 'elcan@gmail.com',
                name: 'Elcan',
                password: 'elcan',
                interests: ['frontend', 'Certified Killer', 'sufferings', 'Developer'],
                created_at: new Date('2023-03-08'),
            },
        ];
    }
    async addUser(user) {
        console.log(`[UsersService] addUser: user=${JSON.stringify(user)}`);
        if (!user.email || !user.name || !user.password) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const existingUser = this.users.find(_user => _user.email === user.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with that email already exists');
        }
        const maxUserId = Math.max(...this.users.map(user => user.userId));
        const newuser = {
            userId: maxUserId + 1,
            email: user.email,
            name: user.name,
            password: user.password,
            interests: [],
            created_at: new Date(),
        };
        this.users.push(newuser);
        return newuser;
    }
    async findOne(email) {
        return this.users.find(user => user.email === email);
    }
    async getInterests(email) {
        const user = this.findOne(email);
        return (await user).interests;
    }
    async validateUser(email, password) {
        console.log(`[UsersService] validateUser, email: ${email}, password: ${password}`);
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            console.log('[UsersService] validateUser: found user', user);
            return Object.assign(Object.assign({}, user), { password: undefined });
        }
        return undefined;
    }
    async addInterest(interest, email) {
        const user = await this.findOne(email);
        if (!user)
            return undefined;
        if (user.interests.includes(interest))
            return user;
        user.interests.push(interest);
        this.userSave(user);
        return user;
    }
    async removeInterest(interest, email) {
        const user = await this.findOne(email);
        if (!user)
            return undefined;
        user.interests = user.interests.filter(userInterest => userInterest !== interest);
        this.userSave(user);
        return user;
    }
    async userSave(user) {
        this.users = [...this.users.filter(_user => _user.email !== user.email), user];
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map