import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TradejourneyService } from './tradejourney.service';

@Controller('tradejourney')
@ApiTags('Trade Journey')
export class TradejourneyController {
  private readonly logger = new Logger(TradejourneyController.name);

  constructor(private readonly tradeJourney: TradejourneyService) {}

  @Get(':tradeId')
  async search(@Req() req: any, @Param('tradeId') tradeId: string) {
    const queryBody = {
      indexName: 'journey',
      query: {
        match: {
          tradeId: tradeId,
          username: req.user.username,
        },
      },
    };
    return await this.tradeJourney.search(queryBody);
  }
}
