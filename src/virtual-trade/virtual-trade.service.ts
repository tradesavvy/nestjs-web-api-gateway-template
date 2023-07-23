import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class VirtualTradeService {
  constructor(
    @Inject('VIRTUAL-TRADE') private readonly auditClient: ClientProxy,
  ) {}

  ping(): any {
    const pattern = { cmd: 'ping' };
    return this.auditClient.send<any>(pattern, {});
  }
}
