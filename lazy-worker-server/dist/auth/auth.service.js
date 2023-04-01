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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.validateUser(email, password);
        let interests = user.interests.split('_');
        interests = interests ? interests : [];
        return Object.assign({ interests }, user);
    }
    async login(user) {
        const interests = user.interests.split('_');
        const payload = {
            email: user.email,
            name: user.name,
            interests: interests ? interests : [],
        };
        return {
            userId: user.userId,
            access_token: this.jwtService.sign(payload),
            email: user.email,
            name: user.name,
            interests: interests ? interests : [],
        };
    }
    async register(req) {
        const user = await this.usersService.addUser(req);
        this.mailService.sendMail(user.email, user.otp);
        return 1;
    }
    async confirm(email, otp) {
        const user = await this.usersService.findOneByUserEmail(email);
        if (otp == user.otp) {
            user.isEmailConfirmed = true;
            await this.usersService.confirmEmail(user);
            return true;
        }
        return false;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map