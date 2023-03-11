"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
let ArticlesService = class ArticlesService {
    constructor() {
        this.articles = [
            {
                title: 'Job 1',
                description: 'Demir yigan',
                owner: 'elnur@gmail.com',
                ownerName: 'elnur',
            },
            {
                title: 'Job 2',
                description: 'Halca yuyan',
                owner: 'elcan@gmail.com',
                ownerName: 'elcan',
            },
            {
                title: 'Job 3',
                description: 'Yeyib yatan',
                owner: 'sasha@gmail.com',
                ownerName: 'sasha',
            },
            {
                title: 'Job 4',
                description: 'Meyxana deyen',
                owner: 'sasha@gmail.com',
                ownerName: 'sasha',
            },
        ];
    }
    async findByOwnerEmail(ownerEmail) {
        return this.articles.filter(item => item.owner === ownerEmail);
    }
    async findAll() {
        return this.articles;
    }
};
ArticlesService = __decorate([
    (0, common_1.Injectable)()
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map