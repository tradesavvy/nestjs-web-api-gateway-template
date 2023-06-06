/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class InstruementService {
  private readonly logger = new Logger(InstruementService.name);

  constructor(
    // @ts-ignore
    @Inject('INSTRUEMENT') private readonly instruementClient: ClientProxy,
  ) {}

 

  healthCheck(): any {
    this.logger.log("TEST ")
    const pattern = { cmd: 'healthCheck' };
    return this.instruementClient.send<any>(pattern, {});
  }

}
