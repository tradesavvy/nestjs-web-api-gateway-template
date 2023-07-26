import { Body, Controller, Logger, Post } from '@nestjs/common';
import { WhatsAppBotService } from './whatsappbot.service';

@Controller('whatsapp')
export class WhatsAppBotController {
  private readonly logger = new Logger(WhatsAppBotController.name);

  constructor(private readonly whatsAppBotService: WhatsAppBotService) {}

  @Post('')
  sendNotification(@Body() payload: any): any {
    this.whatsAppBotService.sendNotification(payload);
  }
}
