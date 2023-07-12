/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRiskProfileDto,
  UpdateRiskProfileDto,
} from 'src/common/dtos/riskprofile.dto';

@Injectable()
export class UserRiskProfileService {
  private readonly logger = new Logger(UserRiskProfileService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  createRiskProfile(createRiskProfileDto: CreateRiskProfileDto) {
    this.logger.log(
      'sending createRiskProfileDto... ' + JSON.stringify(createRiskProfileDto),
    );
    const pattern = { cmd: 'createRiskProfile' };
    return this.userClient.send<any>(pattern, createRiskProfileDto);
  }
  updateRiskProfile(updateRiskProfileDto: UpdateRiskProfileDto) {
    this.logger.log(
      'sending updateRiskProfileDto... ' + JSON.stringify(updateRiskProfileDto),
    );
    const pattern = { cmd: 'updateRiskProfile' };
    return this.userClient.send<any>(pattern, updateRiskProfileDto);
  }
  assignPrimaryRiskProfile(dto: any): any {
    this.logger.log(
      'sending assignPrimaryRiskProfile... ' + JSON.stringify(dto),
    );
    const pattern = { cmd: 'assignPrimaryRiskProfile' };
    return this.userClient.send<any>(pattern, dto);
  }
  getRiskProfilesByUsername(payload: string): any {
    const pattern = { cmd: 'getRiskProfilesByUsername' };
    this.logger.log('getRiskProfilesByUsername' + payload);
    return this.userClient.send<any>(pattern, payload);
  }

  getActiveRiskProfileByUsername(payload: string): any {
    const pattern = { cmd: 'getActiveRiskProfileByUsername' };
    this.logger.log('getActiveRiskProfileByUsername' + payload);
    return this.userClient.send<any>(pattern, payload);
  }
  async deleteUserRiskProfile(dto: any): Promise<any> {
    this.logger.log('Received request for deleteUserRiskProfile: ' + dto);
    const pattern = { cmd: 'deleteRiskProfile' };
    return this.userClient.send<any>(pattern, dto);
  }
}
