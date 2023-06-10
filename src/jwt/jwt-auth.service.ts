import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-auth.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  login(email: any, username: string) {
    const payload: JwtPayload = { email: email, username: username };
    return {
      // accessToken: this.jwtService.sign(payload, {
      //   secret: this.configService.get('JWT_SECRET_KEY'),
      // }),
      accessToken: this.jwtService.sign(payload, { secret: 'JWT_SECRET_KEY' }),
    };
  }
}
