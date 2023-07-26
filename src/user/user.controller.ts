import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Observable, lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

import { AbstractJwtController } from './abstract.jwt.controller';
import { Response } from 'express';

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

  @Post('verify/whatsapp/otp')
  async userWhatsAppVerifyOtp(
    @Body() dto: any,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log(`WhatsApp Connect: ${JSON.stringify(dto)}`);
    const result$ = this.userService.userWhatsAppVerifyOtp(dto);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/whatsapp/disConnect')
  async disConnectWhatsAppUser(
    @Body() dto: any,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log(`WhatsApp Connect: ${JSON.stringify(dto)}`);
    const result$ = this.userService.disConnectWhatsAppUser(dto);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
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
