import { Controller, Get, Logger, Param } from '@nestjs/common';
import { InstruementService } from './instrument.service';

@Controller('instrument')
export class InstrumentController {
  private readonly logger = new Logger(InstrumentController.name);

  constructor(private readonly instrumentService: InstruementService) {}

  @Get('health-check')
  healthCheck(): any {
    return this.instrumentService.healthCheck();
  }
  @Get('/generate-session/:token')
  generateSession(@Param('token') token: string): any {
    return this.instrumentService.generateSession(token);
  }
  @Get('/load-instrument')
  loadInstrument(): any {
    return this.instrumentService.getInstruments(null);
  }
}
