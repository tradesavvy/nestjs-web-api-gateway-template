import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InstrumentController } from './instrument.controller';
import { InstruementService } from './instrument.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'INSTRUEMENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_INSTRUMENT_QUEUE_NAME || 'ts_instrument_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [InstruementService],
  controllers: [InstrumentController],
})
export class InstrumentModule {}
