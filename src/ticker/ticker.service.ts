import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TickerService {
  constructor(@Inject('TICKER') private readonly tickerClient: ClientProxy) {}

  ping(): any {
    const pattern = { cmd: 'ping' };
    return this.tickerClient.send<any>(pattern, {});
  }

  generateSession(): any {
    const pattern = { cmd: 'generateTicker' };
    return this.tickerClient.send<any>(pattern, {});
  }
}
