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
  updateRiskProfile(
    riskProfileId: string,
    updateRiskProfileDto: UpdateRiskProfileDto,
  ) {
    this.logger.log(
      'sending updateRiskProfileDto... ' + JSON.stringify(updateRiskProfileDto),
    );
    updateRiskProfileDto.riskProfileId = riskProfileId;
    const pattern = { cmd: 'updateRiskProfile' };
    return this.userClient.send<any>(pattern, updateRiskProfileDto);
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
}
