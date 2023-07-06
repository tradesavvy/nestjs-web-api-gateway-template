import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOCIAL',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_SOCIAL_QUEUE_NAME || 'laabhum_social_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [SocialService, TwitterStrategy, SteamStrategy],
  controllers: [SocialController],
})
export class SocialModule {}
