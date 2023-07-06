import { Body, Controller, Post, Req } from '@nestjs/common';
import { Order } from 'src/common/dtos/order';
import { ZerodhahookService } from 'src/zerodhawebhook/zerodhahook.service';

@Controller('zerodhawebhook')
export class ZerodhawebhookController {
  constructor(private readonly zerodhahookService: ZerodhahookService) {}
  @Post('order')
  processZerodhOrderUpdate(@Req() req: any, @Body() payload: any): any {
    this.zerodhahookService.processZerodhOrderUpdate(
      Order.fromRawBody(payload),
    );
  }
}
