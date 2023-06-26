import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from 'src/common/dtos/order';

@Injectable()
export class ZerodhahookService {
  private readonly logger = new Logger(ZerodhahookService.name);

  constructor(@Inject('OMS') private readonly omsClient: ClientProxy) {}
  processZerodhOrderUpdate(payload: Order) {
    this.logger.log('processOrderUpdate ' + payload);
    const pattern = { cmd: 'processZerodhOrderUpdate' };
    return this.omsClient.emit<any>(pattern, payload);
  }
}
