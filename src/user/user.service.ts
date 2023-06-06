import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  healthCheck(payload:any): any {
    this.logger.log('User Service Health check'+ JSON.stringify(payload));
    const pattern = { cmd: 'healthCheck' };
    return this.userClient.send<any>(pattern, payload);
  }

  async accumulate(data: number[]): Promise<number> {
    return await this.userClient.send({ cmd: 'sum' }, data).toPromise();
  }
}
