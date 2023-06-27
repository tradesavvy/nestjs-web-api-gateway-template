import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateWatchlistDto } from './user-watchlist.dto';

@Injectable()
export class UserWatchlistService {
  private readonly logger = new Logger(UserWatchlistService.name);

  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  updateUserWatchlist(dto: CreateWatchlistDto): any {
    this.logger.log('Received request for updateUserWatchlist: ' + dto);
    const pattern = { cmd: 'updateUserWatchlist' };
    return this.userClient.send<any>(pattern, dto);
  }
  getUserWatchlist(payload: { userName: any }): any {
    const pattern = { cmd: 'getUserWatchlist' };
    this.logger.log('getUserWatchlist' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
  updateWatchlistSettings(dto: any): any {
    this.logger.log('Received request for updateWatchlistSettings: ' + dto);
    const pattern = { cmd: 'updateUserWatchlistSettings' };
    return this.userClient.send<any>(pattern, dto);
  }
  getUserWatchlistSettings(payload: { userName: any }): any {
    const pattern = { cmd: 'getUserWatchlistSettings' };
    this.logger.log('getUserWatchlistSettings' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
}
