import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleSuccessResponse } from 'src/common/response.service';

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

  processTargetTrigger(payload: any) {
    this.logger.debug(`process Target Trigger: ${JSON.stringify(payload)}`);
    const pattern = { cmd: 'processTargetTrigger' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', null);
  }

  async getStrategies(payload: any): Promise<any> {
    this.logger.log(
      'Received request for getStrategies: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'getStrategies' };
    return this.omsClient.send<any>(pattern, payload);
  }

  async getStrategyById(payload: any): Promise<any> {
    this.logger.log(
      'Received request for getStrategyById: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'getStrategyById' };
    return this.omsClient.send<any>(pattern, payload);
  }

  async createStrategiesByTrend(payload: any): Promise<any> {
    this.logger.log(
      'Received request for createBuilderByTrend: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'createStrategiesByTrend' };
    return this.omsClient.send<any>(pattern, payload);
  }

  async executeUserStrategy(payload: any): Promise<any> {
    this.logger.log(
      'Received request for executeStrategy: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'executeUserStrategy' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', null);
  }

  async exitUserStrategy(payload: any): Promise<any> {
    this.logger.log(
      'Received request for exitUserStrategy: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'exitUserStrategy' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', null);
  }

  async triggerUserStategy(payload: any): Promise<any> {
    this.logger.log(
      'Received request for triggerUserStategy: ' + JSON.stringify(payload),
    );
    const pattern = { cmd: 'triggerUserStategy' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', null);
  }
}
