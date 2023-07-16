import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject('CONFIGURATION') private readonly configurationClient: ClientProxy,
  ) {}

  ping(): any {
    const pattern = { cmd: 'ping' };
    return this.configurationClient.send<any>(pattern, {});
  }
}
