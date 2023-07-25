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
  getTrends(): any {
    this.logger.log('getTrends ');
    const pattern = { cmd: 'getTrends' };
    return this.omsClient.send<any>(pattern, {});
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
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async ctcChildOrder(payload: any): Promise<any> {
    this.logger.log('ctcChildOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'ctcChildOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async exitChildOrder(payload: any): Promise<any> {
    this.logger.log('exitChildOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'exitChildOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async cancelChildEntryOrder(payload: any): Promise<any> {
    this.logger.log('cancelChildEntryOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'cancelChildEntryOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async modifyParentOrder(payload: any): Promise<any> {
    this.logger.log('modifyParentOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'modifyParentOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async modifyChildOrder(payload: any): Promise<any> {
    this.logger.log('modifyChildOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'modifyChildOrder' };
    this.omsClient.emit<any>(pattern, payload);
    0;
    return handleSuccessResponse('success', { message: 'Request Received' });
  }

  cancelParentEntryOrder(payload: any): any {
    this.logger.log('cancelParentEntryOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'cancelParentEntryOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  exitParentOrder(payload: any): any {
    this.logger.log('exitParentOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'exitParentOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  exitAll(payload: any): any {
    this.logger.log('exitAll ' + JSON.stringify(payload));
    const pattern = { cmd: 'exitAll' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  ctcParentOrder(payload: any): any {
    this.logger.log('ctcParentOrder ' + JSON.stringify(payload));
    const pattern = { cmd: 'ctcParentOrder' };
    this.omsClient.emit<any>(pattern, payload);
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
}
