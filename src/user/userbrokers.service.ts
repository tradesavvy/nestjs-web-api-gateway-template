/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserbrokersService {
  private readonly logger = new Logger(UserbrokersService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async createUserBroker(dto: any): Promise<any> {
    const pattern = { cmd: 'createUserBroker' };
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
