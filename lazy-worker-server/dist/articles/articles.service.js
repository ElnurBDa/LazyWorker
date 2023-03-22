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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let ArticlesService = class ArticlesService {
    constructor(usersService) {
        this.usersService = usersService;
        this.articles = [
            {
                id: 1,
                title: "Killer",
                description: "I need a killer for personal needs...",
                category: "Certified Killer",
                author: "Elnur",
                date: new Date("2022-03-25"),
                website: "upwork",
                redirectLink: "#",
            },
            {
                id: 2,
                title: "Slave",
                description: "I need a slave for selling it to mother America!",
                category: "Certified Slave",
                author: "Elcan",
                date: new Date("2022-03-25"),
                website: "upwork",
                redirectLink: "#",
            },
            {
                id: 3,
                title: "Tree log",
                description: "Our 100 billion company needs a tree log for heating home, really really need(((",
                category: "Certified Tree log",
                author: "Elcan",
                date: new Date("2022-03-25"),
                website: "upwork",
                redirectLink: "#",
            },
            {
                id: 4,
                title: "Clown",
                description: "idk, we need you... uwu",
                category: "Developer",
                author: "Sasha",
                date: new Date("2022-03-25"),
                website: "freelancer",
                redirectLink: "#",
            },
        ];
    }
    async findByCategory(category) {
        return this.articles.filter(item => item.category === category);
    }
    async findByCategories(categories) {
        let articles = [];
        for (let index = 0; index < categories.length; index++) {
            const category = categories[index];
            const categoriesByCategory = await this.findByCategory(category);
            articles = [...articles, ...categoriesByCategory];
        }
        return articles;
    }
    async findByUserEmail(ownerEmail) {
        const interests = await this.usersService.getInterests(ownerEmail);
        return this.findByCategories(interests);
    }
    async findAll() {
        return this.articles;
    }
};
ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map