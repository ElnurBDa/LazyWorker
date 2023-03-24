import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private articlesService;
    constructor(articlesService: ArticlesService);
    getAllArticles(): Promise<import("./article.entity").Article[]>;
    getUserArticles(req: any): Promise<import("./article.entity").Article[]>;
}
