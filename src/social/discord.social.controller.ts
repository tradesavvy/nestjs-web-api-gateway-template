import {
  Controller,
  Get,
  Logger,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SocialService } from './social.service';

@Controller('social')
@ApiTags('Social')
export class DiscordSocialController {
  private readonly logger = new Logger('DiscordSocialController');

  constructor(
    private readonly socialService: SocialService,
    private readonly emitter: EventEmitter2,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/discord/:socialId/disconnect')
  async getSocialDisconnectForDiscord(
    @Param('username') username: string,
    @Param('socialId') socialId: string,
    @Req() req: any,
  ): Promise<Observable<any>> {
    const socialname = 'discord';
    this.logger.log(
      'social Disconnect..user: ' + username + ' socialname: ' + socialname,
    );

    try {
      this.logger.log('Sending request to update Quest for disconnect..');
      if (username !== req?.user?.username) {
        this.logger.log('User Unauthorized:' + username);
        throw new UnauthorizedException();
      }
      return await this.socialService.getSocialDisconnect({
        username: username,
        socialname: socialname,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
