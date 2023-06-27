import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  private readonly logger = new Logger(ConfigurationController.name);

  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('ping')
  ping(): any {
    this.logger.log('ping...');
    return this.configurationService.ping();
  }

}
