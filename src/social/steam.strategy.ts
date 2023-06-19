import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { SocialService } from './social.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  private readonly logger = new Logger('SocialController');
  constructor(private socialService: SocialService) {
    super({
      returnURL: process.env.STEAM_RETURN_URL,
      realm: process.env.STEAM_REALM,
      apiKey: process.env.STEAM_API_KEY,
      passReqToCallback: true,
    });
    this.logger.log(`STEAM_REALM: ${process.env.STEAM_REALM}`);
    this.logger.log(`STEAM_RETURN_URL: ${process.env.STEAM_RETURN_URL}`);
  }

  async validate(req: Request, identifier: any, profile: any): Promise<any> {
    this.logger.log('steam identifier detail:' + JSON.stringify(identifier));
    this.logger.log('steam Profile detail:' + JSON.stringify(profile));
    return this.socialService.validateSteamUser(profile);
  }
}
