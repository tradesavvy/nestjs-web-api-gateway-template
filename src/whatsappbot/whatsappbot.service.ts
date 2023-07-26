import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class WhatsAppBotService {
  private readonly logger = new Logger(WhatsAppBotService.name);

  constructor(
    @Inject('WHATSAPPBOT') private readonly whatsAppBotClient: ClientProxy,
  ) {}

  sendNotification(payload: any): Observable<ResponseDto> {
    const { template, to, dialCode, body } = payload;
    this.logger.log('sendNotification payload ' + JSON.stringify(payload));
    const pattern = { cmd: 'sendNotification' };
    const data = {
      template: template,
      to: to,
      dialCode: dialCode,
      messagebody: body,
    };
    return this.whatsAppBotClient.send<any>(pattern, data);
  }
}
