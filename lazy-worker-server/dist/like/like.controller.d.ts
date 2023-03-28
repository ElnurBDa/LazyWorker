import { LikeService } from './like.service';
export declare class LikeController {
    private likeService;
    constructor(likeService: LikeService);
    likeArticle(req: any): void;
}
