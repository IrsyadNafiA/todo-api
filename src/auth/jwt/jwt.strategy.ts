import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadInterface } from '@types';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'alsdj213kukukakikusakit123kljasd',
    });
  }

  async validate(payload: JwtPayloadInterface) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
