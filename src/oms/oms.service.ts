import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OmsService {
  private readonly logger = new Logger(OmsService.name);

  constructor(@Inject('OMS') private readonly omsClient: ClientProxy) {}
  ping(): any {
    this.logger.log('ping Check ');
    const pattern = { cmd: 'pingTickerFromTrade' };
    // this.logger.log('ticker client ' + JSON.stringify(this.omsClient));
    return this.omsClient.send<any>(pattern, { data: 'pingTickerFromTrade' });
  }
  convertUserMessageToOrder(payload: any): any {
    this.logger.log('convertUserMessageToOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'convertUserMessageToOrder' };
    return this.omsClient.send<any>(pattern, payload);
  }
  convertUserMessageToStrategy(payload: any): any {
    this.logger.log('convertUserMessageToStrategy ' + JSON.stringify(payload));
    const pattern = { cmd: 'convertUserMessageToStrategy' };
    return this.omsClient.send<any>(pattern, payload);
  }
  getTrades(userName: any): any {
    this.logger.log('getTrades ' + userName);
    const pattern = { cmd: 'getTrades' };
    return this.omsClient.send<any>(pattern, { userName: userName });
  }
  getTradesById(payload: { userName: any; tradeId: string }): any {
    this.logger.log('getTradesById ' + payload.tradeId);
    const pattern = { cmd: 'getTradesById' };
    return this.omsClient.send<any>(pattern, payload);
  }
}
