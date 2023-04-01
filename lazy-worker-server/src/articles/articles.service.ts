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
    // // console.log(`[ArticlesService] findByCategory`, category);
    return (await this.repository.find({ where: { category: category } })).sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );
  }

  async findByCategories(categories: string[]): Promise<Article[]> {
    let articles = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      const categoriesByCategory = await this.findByCategory(category);
      articles = [...articles, ...categoriesByCategory];
    }

    // const tempArticle = categories.map(async (category) => await this.findByCategories(categories))

    // // console.log(`[ArticlesService] findByCategories`, articles);
    return articles.sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );
  }

  async findByUserEmail(ownerEmail: string): Promise<Article[]> {
    const interests = await this.usersService.getInterests(ownerEmail);
    // // console.log(`[ArticlesService] findByUserEmail`, interests);
    return (await this.findByCategories(interests)).sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );
  }

  async findAll(): Promise<Article[]> {
    // // console.log(`[ArticlesService] findAll`);
    return (await this.repository.find()).sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );
  }
}
