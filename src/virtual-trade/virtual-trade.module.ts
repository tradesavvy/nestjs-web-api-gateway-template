import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VirtualTradeService } from './virtual-trade.service';
import { VirtualTradeController } from './virtual-trade.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIRTUAL-TRADE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue:
            process.env.RMQ_VIRTUAL_TRADE_QUEUE_NAME ||
            'laabam_virtual_trade_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [VirtualTradeController],
  providers: [VirtualTradeService],
})
export class VirtualTradeModule {}
