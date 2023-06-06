import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/health-check')
  async healthCheck(): Promise<any> {
    this.logger.log('userController send health check ... ');
    return this.userService.healthCheck({test:'test'});
  }
}
