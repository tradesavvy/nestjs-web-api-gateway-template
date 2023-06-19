import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DiscordSocialController } from './discord.social.controller';
import { DiscordStrategy } from './discord.strategy';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { SteamStrategy } from './steam.strategy';
import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOCIAL',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_SOCIAL_QUEUE_NAME || 'laabam_social_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [SocialService, DiscordStrategy, TwitterStrategy, SteamStrategy],
  controllers: [SocialController, DiscordSocialController],
})
export class SocialModule {}
