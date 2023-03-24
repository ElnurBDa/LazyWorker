"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    async addUser(user) {
        console.log(`[UsersService] addUser: user=${JSON.stringify(user)}`);
        if (!user.email || !user.name || !user.password) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const newuser = new user_entity_1.User();
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
    async findOne(email) {
        return this.repository.findOne({ where: { email: email } });
    }
    async getInterests(email) {
        const user = await this.findOne(email);
        console.log('[UserService] getInterests ', user.interests.split('_'));
        return user.interests.split('_');
    }
    async validateUser(email, password) {
        console.log(`[UsersService] validateUser, email: ${email}, password: ${password}`);
        const user = await this.findOne(email);
        if (user) {
            console.log('[UsersService] validateUser: found user', user);
            const match = await bcrypt.compare(password, user.password);
            console.log('[UsersService] validateUser: matched', match);
            if (match) {
                return Object.assign(Object.assign({}, user), { password: undefined });
            }
        }
        return undefined;
    }
    async addInterest(interest, email) {
        const user = await this.findOne(email);
        if (!user)
            return undefined;
        if (user.interests.split('_').includes(interest))
            return user;
        user.interests = user.interests + "_" + interest;
        return this.repository.save(user);
    }
    async removeInterest(interest, email) {
        const user = await this.findOne(email);
        if (!user)
            return undefined;
        user.interests = user.interests.split('_').filter(userInterest => userInterest !== interest).join('_');
        return this.repository.save(user);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "repository", void 0);
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map