import { Injectable } from '@nestjs/common';
import { IArticle } from './articles.interface';

@Injectable()
export class ArticlesService {

  private readonly articles: IArticle[] = [
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

  async findByOwnerEmail(ownerEmail: string): Promise<IArticle[] | undefined> {
    return this.articles.filter(item => item.owner === ownerEmail);
  }

  async findAll(): Promise<IArticle[]> {
    return this.articles;
  }
}
