import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserRiskProfileService } from './user-riskprofile-service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userRiskProfileService: UserRiskProfileService,
    private readonly userService: UserService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.userService.ping();
  }

  @Post('/createRiskProfile')
  createRiskProfile(@Body() payload: any): any {
    return this.userRiskProfileService.createRiskProfile(payload);
  }
  @Post('/updateRiskProfile')
  updateRiskProfile(@Body() payload: any): any {
    return this.userRiskProfileService.updateRiskProfile(payload);
  }
  @Get('/profile/:username')
  getUserRiskProfiles(@Param('username') username: string): any {
    return this.userRiskProfileService.getRiskProfilesByUsername(username);
  }
}
