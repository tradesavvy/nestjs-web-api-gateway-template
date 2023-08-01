import {
  Body,
  Controller,
  Headers,
  Logger,
  Post,
  Request,
  Res,
} from '@nestjs/common';
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

  @Post('twilio/webhook')
  handleWebhook(
    @Request() req: any,
    @Headers('x-twilio-signature') twilloSignature: string,
  ): any {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    this.logger.log('Twillo  Signature' + twilloSignature);
    this.logger.log('Twillo headers ' + req.body);
    this.logger.log('URL ' + url);
    return this.whatsAppBotService.verifyWebhook(
      JSON.stringify(req.body),
      twilloSignature,
      url,
    );
  }
}
