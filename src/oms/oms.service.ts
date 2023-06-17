import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OmsService {
  private readonly logger = new Logger(OmsService.name);

  constructor(@Inject('OMS') private readonly omsClient: ClientProxy) {}
  ping(): any {
    this.logger.log('ping Check ');
    const pattern = { cmd: 'ping' };
    return this.omsClient.send<any>(pattern, {});
  }
  convertUserMessageToOrder(payload: any): any {
    this.logger.log('convertUserMessageToOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'convertUserMessageToOrder' };
    return this.omsClient.send<any>(pattern, payload);
  }
}
