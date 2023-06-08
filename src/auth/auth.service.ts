import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  healthCheck(payload:any): any {
    this.logger.log('Auth Service Health check'+ JSON.stringify(payload));
    const pattern = { cmd: 'healthCheck' };
    return this.authClient.send<any>(pattern, payload);
  }

  async accumulate(data: number[]): Promise<number> {
    return await this.authClient.send({ cmd: 'sum' }, data).toPromise();
  }
}
