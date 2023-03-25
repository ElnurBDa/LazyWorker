import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(private usersService: UsersService) {}

  @InjectRepository(Article)
  private readonly repository: Repository<Article>;

  async findByCategory(category: string): Promise<Article[]> {
    console.log(`[ArticlesService] findByCategory`, category);
    return this.repository.find({ where: { category: category } });
  }

  async findByCategories(categories: string[]): Promise<Article[]> {
    let articles = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      const categoriesByCategory = await this.findByCategory(category);
      articles = [...articles, ...categoriesByCategory];
    }
    console.log(`[ArticlesService] findByCategories`, articles);
    return articles;
  }

  async findByUserEmail(ownerEmail: string): Promise<Article[]> {
    const interests = await this.usersService.getInterests(ownerEmail);
    console.log(`[ArticlesService] findByUserEmail`, interests);
    return this.findByCategories(interests);
  }

  async findAll(): Promise<Article[]> {
    console.log(`[ArticlesService] findAll`);
    return this.repository.find();
  }
}
