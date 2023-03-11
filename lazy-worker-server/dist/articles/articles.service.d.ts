import { IArticle } from './articles.interface';
export declare class ArticlesService {
    private readonly articles;
    findByOwnerEmail(ownerEmail: string): Promise<IArticle[] | undefined>;
    findAll(): Promise<IArticle[]>;
}
