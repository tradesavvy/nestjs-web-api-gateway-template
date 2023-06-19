import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { SocialService } from './social.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  private readonly logger = new Logger('SocialController');
  constructor(private socialService: SocialService) {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_REDIRECT_URI,
      passReqToCallback: true,
      state: 'your-state-parameter',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    this.logger.log('state value' + req.query.state);
    this.logger.log('discord Profile detail:' + JSON.stringify(profile));
    // const { username, discriminator, id: discordId, avatar } = profile;
    // const details = { username, discriminator, discordId, avatar };
    return this.socialService.validateTwitterUser(profile);
  }
}
