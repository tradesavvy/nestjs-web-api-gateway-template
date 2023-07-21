import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ConfigurationService {
  private readonly logger = new Logger(ConfigurationService.name);

  constructor(
    @Inject('CONFIGURATION') private readonly configurationClient: ClientProxy,
  ) {}

  ping(): any {
    const pattern = { cmd: 'ping' };
    return this.configurationClient.send<any>(pattern, {});
  }

  async createTopics(dto: any): Promise<any> {
    this.logger.log(
      'Received request for createTopics: ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'createTopics' };
    return this.configurationClient.send<any>(pattern, dto);
  }
  async deleteTopics(dto: any): Promise<any> {
    this.logger.log(
      'Received request for deleteTopics: ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'deleteTopics' };
    return this.configurationClient.send<any>(pattern, dto);
  }
  async createUserBroker(dto: any): Promise<any> {
    this.logger.log(
      'Received request for createUserBroker: ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'createUserBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }
  getuserBrokers(payload: any): any {
    const pattern = { cmd: 'getuserBrokers' };
    this.logger.log('getuserBrokers' + payload);
    return this.configurationClient.send<any>(pattern, payload);
  }
  async assignPrimaryBroker(dto: any): Promise<any> {
    this.logger.log('Received request for assignPrimaryBroker: ' + dto);
    const pattern = { cmd: 'assignPrimaryBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }
  async updateUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for userBrokersService: ' + dto);
    const pattern = { cmd: 'updateUserBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }

  async disconnectUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for userBrokersService: ' + dto);
    const pattern = { cmd: 'disconnectUserBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }

  async connectUserBroker(dto: any): Promise<any> {
    this.logger.log(
      'Received request for connectUserBroker: ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'connectUserBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }

  async enableTrade(dto: any): Promise<any> {
    this.logger.log('Received request for enableTrade: ' + dto);
    const pattern = { cmd: 'enableTrade' };
    return this.configurationClient.send<any>(pattern, dto);
  }

  async updateSortOrder(dto: any): Promise<any> {
    this.logger.log('Received request for updateSortOrder: ' + dto);
    const pattern = { cmd: 'updateSortOrder' };
    return this.configurationClient.send<any>(pattern, dto);
  }

  async deleteUserBroker(dto: any): Promise<any> {
    this.logger.log('Received request for deleteUserBroker: ' + dto);
    const pattern = { cmd: 'deleteuserBroker' };
    return this.configurationClient.send<any>(pattern, dto);
  }
}
