import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('configuration/kafka')
@ApiTags('Configuration Kafka')
export class KafkaAdminController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(KafkaAdminController.name);

  constructor(private readonly configurationService: ConfigurationService) {
    super();
  }

  @Post()
  createTopic(@Req() req: any, @Body() dto: any): any {
    this.logger.log('Received request for createTopic: ' + JSON.stringify(dto));
    return this.configurationService.createTopic(dto);
  }
}
