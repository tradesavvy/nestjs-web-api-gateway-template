import { Controller, Get, Logger } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { ApiTags } from '@nestjs/swagger';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('ticker')
@ApiTags('Ticker')
export class TickerController extends AbstractJwtController {
  private readonly logger = new Logger(TickerController.name);

  constructor(private readonly tickerService: TickerService) {
    super();
  }
  getLogger(): Logger {
    return this.logger;
  }
  @Get('ping')
  ping(): any {
    this.logger.log('ping...');
    return this.tickerService.ping();
  }

  @Get('atm')
  getIndexAtm(): any {
    return this.tickerService.getAtm();
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
