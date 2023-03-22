/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(`[AuthController] login`)
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() req) {
    console.log(`[AuthController] register`)
    return this.authService.register(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(`[AuthController] getProfile`)
    return req.user;
  }
}
