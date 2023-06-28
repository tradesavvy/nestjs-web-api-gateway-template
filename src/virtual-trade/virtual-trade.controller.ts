import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VirtualTradeService } from './virtual-trade.service';

@Controller('audit')
@ApiTags('Audit')
export class VirtualTradeController {
  private readonly logger = new Logger(VirtualTradeController.name);

  constructor(private readonly virtualService: VirtualTradeService) {}

  @Get('ping')
  ping(): any {
    this.logger.log('ping...');
    return this.virtualService.ping();
  }

}
