/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticlesService } from './articles.service';

@Controller('article')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  
  @Get('all')
  getAllArticles() {
    console.log(`[ArticlesController] getAllArticles`)
    return this.articlesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserArticles(@Request() req) {
    console.log(`[ArticlesController] getUserArticles`, req.user)
    return this.articlesService.findByUserEmail(req.user.email);
  }
}
