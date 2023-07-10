import {
  Controller,
  Get,
  Logger,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserRiskProfileService } from './userriskprofile.service';
import { UserbrokersService } from './userbrokers.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userRiskProfileService: UserRiskProfileService,
    private readonly userbrokersService: UserbrokersService,
    private readonly userService: UserService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.userService.ping();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mobile/:phoneNumber')
  getUserByMobileNumber(@Param('phoneNumber') phoneNumber: string): any {
    return this.userService.getUserByMobileNumber(phoneNumber);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  getUserByUsername(@Param('username') username: string): any {
    return this.userService.getUserByUsername(username);
  }
  @Get('email/:email')
  getUserByEmail(@Param('email') email: string): any {
    return this.userService.getUserByEmail(email);
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
