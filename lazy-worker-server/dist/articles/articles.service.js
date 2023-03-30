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
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
let ArticlesService = class ArticlesService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findByCategory(category) {
        return (await this.repository.find({ where: { category: category } })).sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }
    async findByCategories(categories) {
        let articles = [];
        for (let index = 0; index < categories.length; index++) {
            const category = categories[index];
            const categoriesByCategory = await this.findByCategory(category);
            articles = [...articles, ...categoriesByCategory];
        }
        return articles.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }
    async findByUserEmail(ownerEmail) {
        const interests = await this.usersService.getInterests(ownerEmail);
        return (await this.findByCategories(interests)).sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }
    async findAll() {
        return (await this.repository.find()).sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(article_entity_1.Article),
    __metadata("design:type", typeorm_2.Repository)
], ArticlesService.prototype, "repository", void 0);
ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map