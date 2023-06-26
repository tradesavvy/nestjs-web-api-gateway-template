import { Module } from '@nestjs/common';
import { ZerodhawebhookController } from './zerodhawebhook.controller';
import { ZerodhahookService } from './zerodhahook.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'OMS',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_INSTRUMENT_OMS_NAME || 'ts_oms_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ZerodhawebhookController],
  providers: [ZerodhahookService],
})
export class ZerodhawebhookModule {}
