import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IArticle } from './articles.interface';

@Injectable()
export class ArticlesService {
  constructor(
    private usersService: UsersService
  ) {}

  private readonly articles: IArticle[] = [
    {
      postId: 1,
      title: "Killer",
      description: "I need a killer for personal needs...",
      category: "Certified Killer",
      author: "Elnur",
      date: new Date("2022-03-25"),
      website: "upwork",
      redirectLink: "#",
    },
    {
      postId: 2,
      title: "Slave",
      description: "I need a slave for selling it to mother America!",
      category: "Certified Slave",
      author: "Elcan",
      date: new Date("2022-03-25"),
      website: "upwork",
      redirectLink: "#",
    },
    {
      postId: 3,
      title: "Tree log",
      description: "Our 100 billion company needs a tree log for heating home, really really need(((",
      category: "Certified Tree log",
      author: "Elcan",
      date: new Date("2022-03-25"),
      website: "upwork",
      redirectLink: "#",
    },
    {
      postId: 4,
      title: "Clown",
      description: "idk, we need you... uwu",
      category: "Developer",
      author: "Sasha",
      date: new Date("2022-03-25"),
      website: "freelancer",
      redirectLink: "#",
    },
  ];
  
  async findByCategory(category: string): Promise<IArticle[]> {
    return this.articles.filter(item => item.category === category);
  }
  
  async findByCategories(categories: string[]): Promise<IArticle[]> {
    let articles = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      const categoriesByCategory = await this.findByCategory(category);
      articles = [...articles,...categoriesByCategory];
    }
    return articles;
  }

  async findByUserEmail(ownerEmail: string): Promise<IArticle[]> {
    const interests = await this.usersService.getInterests(ownerEmail);
    return this.findByCategories(interests);
  }

  async findAll(): Promise<IArticle[]> {
    return this.articles;
  }
}
