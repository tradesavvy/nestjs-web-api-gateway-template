import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WhatsAppBotController } from './whatsappbot.controller';
import { WhatsAppBotService } from './whatsappbot.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'WHATSAPPBOT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue:
            process.env.RMQ_WHATSAPPBOT_QUEUE_NAME ||
            'laabhum_whatsapp_bot_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [WhatsAppBotController],
  providers: [WhatsAppBotService],
})
export class WhatsAppBotModule {}
