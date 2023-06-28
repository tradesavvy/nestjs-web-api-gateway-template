import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';

import { UserRiskProfileService } from './userriskprofile.service';
import { AbstractJwtController } from './abstract.jwt.controller';

@Controller('users/riskprofile')
@ApiTags('User Risk Profiles')
export class UserRiskProfileController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(UserRiskProfileController.name);

  constructor(
    private readonly userRiskProfileService: UserRiskProfileService,

    private readonly emitter: EventEmitter2,
  ) {
    super();
  }

  @Post()
  createRiskProfile(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    return this.userRiskProfileService.createRiskProfile(payload);
  }

  @Post(':userName/:id')
  updateRiskProfile(
    @Req() req: any,
    @Body() dto: any,
    @Param('userName') userName: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, userName);
    dto.userName = userName;
    dto.riskProfileId = id;
    return this.userRiskProfileService.updateRiskProfile(dto);
  }

  @Post('assign/:userName/:id')
  assignPrimaryRiskProfile(
    @Req() req: any,
    @Body() dto: any,
    @Param('userName') userName: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, userName);
    dto.userName = userName;
    dto.riskProfileId = id;
    return this.userRiskProfileService.assignPrimaryRiskProfile(dto);
  }

  @Get()
  getUserRiskProfiles(@Req() req: any): any {
    return this.userRiskProfileService.getRiskProfilesByUsername(
      req.user.username,
    );
  }

  @Get(':username/active')
  getActiveRiskProfileByUsername(
    @Req() req: any,
    @Param('username') username: string,
  ): any {
    this.authorizationCheck(req, username);
    return this.userRiskProfileService.getActiveRiskProfileByUsername(username);
  }
}
