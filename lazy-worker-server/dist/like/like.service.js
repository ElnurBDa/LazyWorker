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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("../articles/article.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("./like.entity");
let LikeService = class LikeService {
    async likeArticle(req) {
        const userId = req.userId;
        const postId = req.postId;
        const like = await this.likeRepository.findOne({
            where: { userId, postId },
        });
        if (like) {
            await this.likeRepository.remove(like);
            const article = await this.articleRepository.findOne({
                where: { postId: postId },
            });
            article.score--;
            await this.articleRepository.save(article);
        }
        else {
            const user = await this.userRepository.findOne({
                where: { userId: userId },
            });
            const article = await this.articleRepository.findOne({
                where: { postId: postId },
            });
            if (user && article) {
                article.score++;
                await this.articleRepository.save(article);
                const like = new like_entity_1.Like();
                like.postId = postId;
                like.userId = userId;
                await this.likeRepository.save(like);
            }
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(article_entity_1.Article),
    __metadata("design:type", typeorm_2.Repository)
], LikeService.prototype, "articleRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], LikeService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(like_entity_1.Like),
    __metadata("design:type", typeorm_2.Repository)
], LikeService.prototype, "likeRepository", void 0);
LikeService = __decorate([
    (0, common_1.Injectable)()
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map