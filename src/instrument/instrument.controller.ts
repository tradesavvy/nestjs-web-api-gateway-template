import { Controller, Get, Logger, Param } from '@nestjs/common';
import { InstruementService } from './instrument.service';
import { ApiTags } from '@nestjs/swagger';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('instrument')
@ApiTags('Instrument')
export class InstrumentController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(InstrumentController.name);

  constructor(private readonly instrumentService: InstruementService) {
    super();
  }

  @Get('ping')
  ping(): any {
    return this.instrumentService.ping();
  }

  @Get('generate-session/:token')
  generateSession(@Param('token') token: string): any {
    return this.instrumentService.generateSession(token);
  }

  @Get('load-instrument')
  loadInstrument(): any {
    return this.instrumentService.loadInstrument();
  }

  @Get(':exchange')
  getInstrumentByExchange(@Param('exchange') exchange: string): any {
    return this.instrumentService.getInstrumentByExchange(exchange);
  }

  @Get(':instrumentName/:type/:expiryCycle')
  getInstrument(
    @Param('instrumentName') instrumentName: string,
    @Param('type') strike: string,
    @Param('expiryCycle') expiryCycle: string,
  ): any {
    return this.instrumentService.getInstruments({
      instrumentName: instrumentName,
      type: strike,
      expiryCycle: expiryCycle,
    });
  }
}
