import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { WhatsAppBotService } from './whatsappbot.service';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsAppBotController {
  private readonly logger = new Logger(WhatsAppBotController.name);

  constructor(private readonly whatsAppBotService: WhatsAppBotService) {}

  @Post('')
  async sendNotification(
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<any> {
    const result$ = this.whatsAppBotService.sendNotification(payload);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }
}
