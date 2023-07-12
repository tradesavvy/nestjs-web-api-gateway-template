import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class UserglobalriskService {
  private readonly logger = new Logger(UserglobalriskService.name);

  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  @MessagePattern({ cmd: 'getUserGlobalRisk' })
  async getUserGlobalRisk(username: any): Promise<any> {
    this.logger.log('sending getUserGlobalRisk... ' + username);
    const pattern = { cmd: 'getUserGlobalRisk' };
    return this.userClient.send<any>(pattern, { userName: username });
  }

  @MessagePattern({ cmd: 'updateDayGoalAndMaxLossProfit' })
  async updateDayGoalAndMaxLossProfit(dto: any): Promise<any> {
    this.logger.log(
      'sending updateDayGoalAndMaxLossProfit... ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'updateDayGoalAndMaxLossProfit' };
    return this.userClient.send<any>(pattern, dto);
  }
}
