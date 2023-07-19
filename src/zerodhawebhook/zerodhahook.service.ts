import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from 'src/common/dtos/order';

@Injectable()
export class ZerodhahookService {
  private readonly logger = new Logger(ZerodhahookService.name);

  constructor(@Inject('ZERODHA') private readonly zerodhaClient: ClientProxy) {}
  processZerodhOrderUpdate(payload: Order) {
    this.logger.log('processZerodhOrderUpdate ' + payload);
    const pattern = { cmd: 'processZerodhOrderUpdate' };
    this.zerodhaClient.emit<any>(pattern, payload);
  }
}
