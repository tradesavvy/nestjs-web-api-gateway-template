import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TradejourneyService } from './tradejourney.service';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('tradejourney')
@ApiTags('Trade Journey')
export class TradejourneyController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(TradejourneyController.name);

  constructor(private readonly tradeJourney: TradejourneyService) {
    super();
  }

  @Get(':tradeId')
  async search(@Req() req: any, @Param('tradeId') tradeId: string) {
    const queryBody = {
      indexName: 'journey',
      query: {
        match: {
          tradeId: tradeId,
        },
      },
    };
    return await this.tradeJourney.search(queryBody);
  }
}
