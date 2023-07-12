import {
  Body,
  Controller,
  Delete,
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
import {
  DeleteUserRiskProfileDto,
  UpdateRiskProfileDto,
} from 'src/common/dtos/riskprofile.dto';

@Controller('riskprofile')
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

  @Post(':id')
  updateRiskProfile(
    @Req() req: any,
    @Body() dto: UpdateRiskProfileDto,
    @Param('id') id: string,
  ): any {
    dto.userName = req.user.username;
    dto.riskProfileId = id;
    return this.userRiskProfileService.updateRiskProfile(dto);
  }

  @Post('assign/:id')
  assignPrimaryRiskProfile(
    @Req() req: any,
    @Body() dto: any,
    @Param('id') id: string,
  ): any {
    dto.userName = req.user.username;
    dto.riskProfileId = id;
    return this.userRiskProfileService.assignPrimaryRiskProfile(dto);
  }

  @Get('')
  getUserRiskProfiles(@Req() req: any): any {
    return this.userRiskProfileService.getRiskProfilesByUsername(
      req.user.username,
    );
  }

  @Get('active')
  getActiveRiskProfileByUsername(@Req() req: any): any {
    return this.userRiskProfileService.getActiveRiskProfileByUsername(
      req.user.username,
    );
  }
  @Delete(':id')
  deleteUserRiskProfile(@Req() req: any, @Param('id') id: string): any {
    const dto: DeleteUserRiskProfileDto = {
      userName: req.user.username,
      riskProfileId: id,
    };
    this.logger.log('Received request for deleteUserBroker: ' + dto);
    return this.userRiskProfileService.deleteUserRiskProfile(dto);
  }
}
