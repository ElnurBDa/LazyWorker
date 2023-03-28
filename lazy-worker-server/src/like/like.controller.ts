/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Request } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post()
  likeArticle(@Request() req) {
    console.log('[LikeController] likeArticle',req.body);
    this.likeService.likeArticle(req.body);
  }
}
