import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRiskProfileService } from './userriskprofile.service';
import { UserbrokersService } from './userbrokers.service';
import { UserBrokersController } from './userbroker.controller';
import { UserRiskProfileController } from './userriskprofile.controller';
import { UserWatchlistService } from './user-watchlist.service';
import { UserWatchlistController } from './user-watchlist.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_AUTH_QUEUE_NAME || 'laabhum_auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_USER_QUEUE_NAME || 'laabhum_user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [
    UserController,
    UserBrokersController,
    UserRiskProfileController,
    UserWatchlistController,
  ],
  providers: [
    UserService,
    UserRiskProfileService,
    UserbrokersService,
    UserWatchlistService,
  ],
})
export class UserModule {}
