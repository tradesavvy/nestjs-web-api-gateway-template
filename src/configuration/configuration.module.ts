import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { KafkaAdminController } from './kafkaadmin.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONFIGURATION',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue:
            process.env.RMQ_CONFIGURATION_QUEUE_NAME ||
            'laabhum_configuration_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ConfigurationController, KafkaAdminController],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}
