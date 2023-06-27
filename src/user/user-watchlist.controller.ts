import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserWatchlistService } from './user-watchlist.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateWatchlistDto } from './user-watchlist.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users/watchlist')
@ApiTags('Users')
export class UserWatchlistController {
  private readonly logger = new Logger(UserWatchlistController.name);

  constructor(private readonly userWatchlistService: UserWatchlistService) {}

  @Get()
  getUserWatchlist(@Req() req: any): any {
    return this.userWatchlistService.getUserWatchlist({
      userName: req.user.username,
    });
  }

  @Post()
  updateUserWatchlist(@Req() req: any, @Body() dto: CreateWatchlistDto): any {
    this.logger.log('Received request for updateWatchlist: ' + dto);
    this.authorizationCheck(req, dto.userName);
    dto.userName = req.user.username;
    return this.userWatchlistService.updateUserWatchlist(dto);
  }

  @Get('settings')
  getUserWatchlistSettings(@Req() req: any): any {
    return this.userWatchlistService.getUserWatchlistSettings({
      userName: req.user.username,
    });
  }

  @Post('settings')
  updateWatchlistSettings(@Req() req: any, @Body() dto: any): any {
    this.logger.log('Received request for updateWatchlistSettings: ' + dto);
    this.authorizationCheck(req, dto.userName);
    dto.userName = req.user.username;
    return this.userWatchlistService.updateWatchlistSettings(dto);
  }
  private authorizationCheck(req: any, username: string) {
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User in Req: ' + req?.user?.username);
      this.logger.log('User in path: ' + username);
      throw new UnauthorizedException();
    }
  }
}
