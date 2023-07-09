import { Controller, Get, Logger } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('ticker')
@ApiTags('Ticker')
export class TickerController {
  private readonly logger = new Logger(TickerController.name);

  constructor(private readonly tickerService: TickerService) {}

  @Get('ping')
  ping(): any {
    this.logger.log('ping...');
    return this.tickerService.ping();
  }

  @Get('generate-session')
  generateTickerSession(): any {
    this.logger.log('generate ticker session...');
    return this.tickerService.generateSession();
  }
  @Get('simulator/start')
  start(): any {
    this.logger.log('start simulator...');
    return this.tickerService.startSimulator();
  }
  @Get('simulator/stop')
  stop(): any {
    this.logger.log('stop simulator..');
    return this.tickerService.stopSimulator();
  }
}
