import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { SocialService } from './social.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  private readonly logger = new Logger('SocialController');
  constructor(private socialService: SocialService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'guilds'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    this.logger.log('discord Profile detail:' + JSON.stringify(profile));
    const { username, discriminator, id: discordId, avatar } = profile;
    const details = { username, discriminator, discordId, avatar };
    return this.socialService.validateUser(details);
  }
}
