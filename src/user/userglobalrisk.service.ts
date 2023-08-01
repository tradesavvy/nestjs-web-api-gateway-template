import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { handleSuccessResponse } from 'src/common/response.service';

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

  @MessagePattern({ cmd: 'resetProfit' })
  async resetProfit(): Promise<any> {
    this.logger.log('sending resetProfit... ');
    const pattern = { cmd: 'resetProfit' };
    this.userClient.emit<any>(pattern, {});
    return handleSuccessResponse('success', { message: 'Request Received' });
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
