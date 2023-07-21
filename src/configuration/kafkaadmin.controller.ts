import { Body, Controller, Delete, Logger, Post, Req } from '@nestjs/common';
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
  createTopics(@Req() req: any, @Body() dto: any): any {
    this.logger.log(
      'Received request for createTopics: ' + JSON.stringify(dto),
    );
    return this.configurationService.createTopics(dto);
  }
  @Delete()
  deleteTopics(@Req() req: any, @Body() dto: any): any {
    this.logger.log('Received request for deletTOpics: ' + JSON.stringify(dto));
    return this.configurationService.deleteTopics(dto);
  }
}
