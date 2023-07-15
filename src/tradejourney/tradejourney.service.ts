import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradejourneyService {
  constructor(@Inject('AUDIT') private readonly auditClient: ClientProxy) {}

  search(payload: any): any {
    const pattern = { cmd: 'search' };
    return this.auditClient.send<any>(pattern, payload);
  }
}
