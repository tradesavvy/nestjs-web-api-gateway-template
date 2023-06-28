import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserWatchlistService } from './user-watchlist.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateWatchlistDto } from './user-watchlist.dto';
import { AbstractJwtController } from './abstract.jwt.controller';

@Controller('users/watchlist')
@ApiTags('Users Watchlist')
export class UserWatchlistController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  protected readonly logger = new Logger(UserWatchlistController.name);
  constructor(private readonly userWatchlistService: UserWatchlistService) {
    super();
  }

  @Get()
  getUserWatchlist(@Req() req: any): any {
    return this.userWatchlistService.getUserWatchlist({
      userName: req.user.username,
    });
  }

  @Put(':username')
  updateUserWatchlist(
    @Req() req: any,
    @Body() dto: CreateWatchlistDto,
    @Param('username') username: string,
  ): any {
    this.logger.log('Received request for updateWatchlist: ' + dto);
    this.authorizationCheck(req, username);
    dto.userName = req.user.username;
    return this.userWatchlistService.updateUserWatchlist(dto);
  }

  @Get('settings')
  getUserWatchlistSettings(@Req() req: any): any {
    return this.userWatchlistService.getUserWatchlistSettings({
      userName: req.user.username,
    });
  }

  @Put('settings/:username')
  updateWatchlistSettings(
    @Req() req: any,
    @Body() dto: any,
    @Param('username') username: string,
  ): any {
    this.logger.log('Received request for updateWatchlistSettings: ' + dto);
    this.authorizationCheck(req, username);
    dto.userName = req.user.username;
    return this.userWatchlistService.updateWatchlistSettings(dto);
  }
}
