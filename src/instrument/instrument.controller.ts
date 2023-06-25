import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { InstruementService } from './instrument.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('instrument')
@ApiTags('Instrument')
export class InstrumentController {
  private readonly logger = new Logger(InstrumentController.name);

  constructor(private readonly instrumentService: InstruementService) {}

  @Get('ping')
  ping(): any {
    return this.instrumentService.ping();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('generate-session/:token')
  generateSession(@Param('token') token: string): any {
    return this.instrumentService.generateSession(token);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('load-instrument')
  loadInstrument(): any {
    return this.instrumentService.loadInstrument();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':exchange')
  getInstrumentByExchange(@Param('exchange') exchange: string): any {
    return this.instrumentService.getInstrumentByExchange(exchange);
  }
  @UseGuards(AuthGuard('jwt'))
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
