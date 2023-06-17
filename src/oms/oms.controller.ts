import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { OmsService } from './oms.service';

@Controller('oms')
export class OmsController {
  private readonly logger = new Logger(OmsController.name);

  constructor(private readonly omsService: OmsService) {}
  @Get('ping')
  ping(): any {
    return this.omsService.ping();
  }
  @Post()
  placeOrder(@Body() payload: any): any {
    return this.omsService.convertUserMessageToOrder(payload);
  }
}
