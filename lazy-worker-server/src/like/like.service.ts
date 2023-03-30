/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/articles/article.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {

  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Like)
  private readonly likeRepository: Repository<Like>;

  async likeArticle(req: any): Promise<void> {
    const userId = req.userId; 
    const postId = req.postId;
    const like = await this.likeRepository.findOne({ where: { userId, postId } })
    // console.log('[LikeService] likeArticle: like',like);

    if (like) {
      await this.likeRepository.remove(like);
      const article = await this.articleRepository.findOne({ where: { postId: postId } });
      article.score--;
      // console.log('[LikeService] likeArticle: article',article);
      await this.articleRepository.save(article);
    } else {
      const user = await this.userRepository.findOne({ where: { userId: userId } });
      const article = await this.articleRepository.findOne({ where: { postId: postId } });
      // console.log('[LikeService] likeArticle: user',user);
      // console.log('[LikeService] likeArticle: article',article);
      if (user && article){ 
        article.score++;
        await this.articleRepository.save(article);
        const like = new Like()
        like.postId = postId;
        like.userId = userId;
        // console.log('[LikeService] likeArticle: like',like);
        await this.likeRepository.save(like);
      }
    }
  }
}
