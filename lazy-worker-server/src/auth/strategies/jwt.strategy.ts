/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  } //process.env.JWT_SECRET

  async validate(payload: any) {
    // console.log(`[JwtStrategy] validate: payload=${JSON.stringify(payload)}`);
    return { userId: payload.sub, email: payload.email };
  }
}
