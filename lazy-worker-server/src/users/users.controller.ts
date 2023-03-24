/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Controller, Get, Req, Request, Post, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addinterest')
  addInterest(@Request() req) {
    console.log(`[UsersController] addInterest`, req.body);
    return this.usersService.addInterest(req.body.interest, req.body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('removeInterest')
  removeInterest(@Request() req) {
    console.log(`[UsersController] removeInterest`, req.body);
    return this.usersService.removeInterest(req.body.interest, req.body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getInterests')
  getInterests(@Request() req) {
    console.log(`[UsersController] getInterests`, req.body);
    return this.usersService.getInterests(req.body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getUser')
  getUser(@Request() req) {
    console.log(`[UsersController] getUser`, req.body);
    return this.usersService.findOne(req.body.email);
  }
}
