/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InstrumentService {
  private readonly logger = new Logger(InstrumentService.name);

  constructor(
    @Inject('INSTRUEMENT') private readonly instruementClient: ClientProxy,
  ) {}

  ping(): any {
    this.logger.log('ping Check ');
    const pattern = { cmd: 'ping' };
    return this.instruementClient.send<any>(pattern, {});
  }
  generateSession(payload: any) {
    const pattern = { cmd: 'generateSession' };
    this.logger.log('generateSession');
    return this.instruementClient.send<any>(pattern, payload);
  }
  loadInstrument(): any {
    const pattern = { cmd: 'loadInstrument' };
    this.logger.log('GetInstruments');
    return this.instruementClient.send<any>(pattern, {});
  }

  getInstruments(payload: any): any {
    const pattern = { cmd: 'getInstruments' };
    this.logger.log('GetInstruments' + JSON.stringify(payload));
    return this.instruementClient.send<any>(pattern, payload);
  }
  getInstrumentByExchange(payload: string): any {
    const pattern = { cmd: 'getInstrumentByExchange' };
    this.logger.log('getInstrumentByExchange' + JSON.stringify(payload));
    return this.instruementClient.send<any>(pattern, payload);
  }
}
