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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('/health-check')
  async healthCheck(): Promise<any> {
    this.logger.log('Auth Controller send health check ... ');
    return this.authService.healthCheck({test:'test'});
  }
}
