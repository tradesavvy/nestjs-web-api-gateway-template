import { Module } from '@nestjs/common';
import { OmsController } from './oms.controller';
import { OmsService } from './oms.service';
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
          queue: process.env.RMQ_INSTRUMENT_OMS_NAME || 'laabham_oms_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OmsController],
  providers: [OmsService],
})
export class OmsModule {}
