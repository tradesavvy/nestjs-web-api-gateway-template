import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { UserRiskProfileService } from './userriskprofile.service';

@Controller('users/riskprofile')
@ApiTags('User Risk Profiles')
export class UserRiskProfileController {
  private readonly logger = new Logger(UserRiskProfileController.name);

  constructor(
    private readonly userRiskProfileService: UserRiskProfileService,

    private readonly emitter: EventEmitter2,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createRiskProfile(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    return this.userRiskProfileService.createRiskProfile(payload);
  }
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserRiskProfiles(@Req() req: any): any {
    return this.userRiskProfileService.getRiskProfilesByUsername(
      req.user.username,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username/active')
  getActiveRiskProfileByUsername(
    @Req() req: any,
    @Param('username') username: string,
  ): any {
    this.authorizationCheck(req, username);
    return this.userRiskProfileService.getActiveRiskProfileByUsername(username);
  }
  private authorizationCheck(req: any, username: string) {
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User in Req: ' + req?.user?.username);
      this.logger.log('User in path: ' + username);
      throw new UnauthorizedException();
    }
  }
}
