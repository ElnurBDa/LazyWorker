import { UsersService } from 'src/users/users.service';
import { IArticle } from './articles.interface';
export declare class ArticlesService {
    private usersService;
    constructor(usersService: UsersService);
    private readonly articles;
    findByCategory(category: string): Promise<IArticle[]>;
    findByCategories(categories: string[]): Promise<IArticle[]>;
    findByUserEmail(ownerEmail: string): Promise<IArticle[]>;
    findAll(): Promise<IArticle[]>;
}
