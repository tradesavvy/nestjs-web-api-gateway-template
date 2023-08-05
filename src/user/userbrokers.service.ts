/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { handleSuccessResponse } from 'src/common/response.service';

@Injectable()
export class UserbrokersService {
  generatePartnerConsent(payload: { userName: any; broker: string }): any {
    const pattern = { cmd: 'generatePartnerConsent' };
    this.logger.log('generatePartnerConsent' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
  private readonly logger = new Logger(UserbrokersService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  @EventPattern({ cmd: 'resetTokens' })
  async resetTokens(): Promise<any> {
    this.logger.log('sending resetTokens... ');
    const pattern = { cmd: 'resetTokens' };
    this.userClient.emit<any>(pattern, {});
    return handleSuccessResponse('success', { message: 'Request Received' });
  }
  async createUserBroker(dto: any): Promise<any> {
    this.logger.log(
      'Received request for createUserBroker: ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'createUserBroker' };
    return this.userClient.send<any>(pattern, dto);
  }
  getuserBrokers(payload: any): any {
    const pattern = { cmd: 'getuserBrokers' };
    this.logger.log('getuserBrokers' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
  async assignPrimaryBroker(dto: any): Promise<any> {
    this.logger.log('Received request for assignPrimaryBroker: ' + dto);
    const pattern = { cmd: 'assignPrimaryBroker' };
    return this.userClient.send<any>(pattern, dto);
  }
  async updateUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for userBrokersService: ' + dto);
    const pattern = { cmd: 'updateUserBroker' };
    return this.userClient.send<any>(pattern, dto);
  }

  async disconnectUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for userBrokersService: ' + dto);
    const pattern = { cmd: 'disconnectUserBroker' };
    return this.userClient.send<any>(pattern, dto);
  }

  async connectUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for connectUserBroker: ' + dto);
    const pattern = { cmd: 'connectUserBroker' };
    return this.userClient.send<any>(pattern, dto);
  }

  async enableTrade(dto: any): Promise<any> {
    this.logger.log('Received request for enableTrade: ' + dto);
    const pattern = { cmd: 'enableTrade' };
    return this.userClient.send<any>(pattern, dto);
  }

  async disableTrade(dto: any): Promise<any> {
    this.logger.log('Received request for disableTrade: ' + dto);
    const pattern = { cmd: 'disableTrade' };
    return this.userClient.send<any>(pattern, dto);
  }

  async updateSortOrder(dto: any): Promise<any> {
    this.logger.log('Received request for updateSortOrder: ' + dto);
    const pattern = { cmd: 'updateSortOrder' };
    return this.userClient.send<any>(pattern, dto);
  }

  async deleteUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for deleteUserBroker: ' + dto);
    const pattern = { cmd: 'deleteuserBroker' };
    return this.userClient.send<any>(pattern, dto);
  }
}
