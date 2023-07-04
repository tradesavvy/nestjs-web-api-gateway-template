import {
  Controller,
  Logger,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller()
export abstract class AbstractJwtController {
  abstract getLogger(): Logger;
  protected authorizationCheck(@Req() req: any, username: string) {
    this.getLogger().log(
      `Authenticate User => JSON.stringify(req.user) for path => ${req.path}`,
    );
    if (username !== req?.user?.username) {
      this.getLogger().log('User in Req: ' + req?.user?.username);
      this.getLogger().log('User in path: ' + username);
      throw new UnauthorizedException();
    }
  }
}
