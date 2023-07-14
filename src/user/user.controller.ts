import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

import { AbstractJwtController } from './abstract.jwt.controller';

@Controller('users')
@ApiTags('Users')
export class UserController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
    super();
  }
  @UseGuards()
  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.userService.ping();
  }

  @Get('mobile/:phoneNumber')
  getUserByMobileNumber(@Param('phoneNumber') phoneNumber: string): any {
    return this.userService.getUserByMobileNumber(phoneNumber);
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string): any {
    return this.userService.getUserByUsername(username);
  }

  @Patch(':username')
  updateUser(
    @Param('username') username: string,
    @Body() updateUser: any,
  ): any {
    updateUser.userName = username;
    return this.userService.updateUser(updateUser);
  }
}
