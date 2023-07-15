import { Module } from '@nestjs/common';
import { TradejourneyController } from './tradejourney.controller';
import { TradejourneyService } from './tradejourney.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUDIT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_AUDIT_QUEUE_NAME || 'laabhum_audit_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [TradejourneyController],
  providers: [TradejourneyService],
})
export class TradejourneyModule {}
