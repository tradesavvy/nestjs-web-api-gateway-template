import { Body, Controller, Post, Req } from '@nestjs/common';
import { Order } from 'src/common/dtos/order';
import { ZerodhahookService } from 'src/zerodhawebhook/zerodhahook.service';

@Controller('zerodha/webhook')
export class ZerodhawebhookController {
  constructor(private readonly zerodhahookService: ZerodhahookService) {}
  @Post()
  processZerodhOrderUpdate(@Req() req: any, @Body() payload: any): any {
    this.zerodhahookService.processZerodhOrderUpdate(
      Order.fromRawBody(payload),
    );
  }
}
