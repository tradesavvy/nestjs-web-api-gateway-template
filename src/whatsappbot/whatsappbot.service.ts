import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WhatsAppBotService {
  private readonly logger = new Logger(WhatsAppBotService.name);

  constructor(
    @Inject('WHATSAPPBOT') private readonly whatsAppBotClient: ClientProxy,
  ) {}

  sendNotification(payload: any) {
    const { template, to, dialCode, body } = payload;
    this.logger.log('sendNotification payload ' + JSON.stringify(payload));
    const pattern = { cmd: 'sendNotification' };
    const data = {
      template: template,
      to: to,
      dialCode: dialCode,
      messagebody: body,
    };
    this.whatsAppBotClient.send<any>(pattern, data);
  }
}
