import { UsersService } from 'src/users/users.service';
import { Article } from './article.entity';
export declare class ArticlesService {
    private usersService;
    constructor(usersService: UsersService);
    private readonly repository;
    private readonly articles;
    findByCategory(category: string): Promise<Article[]>;
    findByCategories(categories: string[]): Promise<Article[]>;
    findByUserEmail(ownerEmail: string): Promise<Article[]>;
    findAll(): Promise<Article[]>;
}
