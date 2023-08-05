import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

export type JwtPayload = { email: string; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  protected readonly logger = new Logger(JwtAuthStrategy.name);
  constructor() {
    super({
      jwtFromRequest: (req: any) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt']; // Replace with the actual cookie name containing the JWT
          this.logger.log('cookies  found' + token);
        } else {
          this.logger.error('cookies not found');
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken();
      },
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET_KEY',
      // secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    return { email: payload.email, username: payload.username };
  }
}
