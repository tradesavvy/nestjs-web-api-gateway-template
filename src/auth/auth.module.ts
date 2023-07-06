import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { ReferralService } from 'src/referral/referral.service';

@Module({
  imports: [
    HttpModule,
    EventEmitterModule.forRoot({
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
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
      {
        name: 'REFERRAL',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue: process.env.RMQ_REFERRAL_QUEUE_NAME || 'laabhum_referral_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    PassportModule,
    UserModule,
    JwtAuthModule
  ],
  providers: [AuthService, UserService, ReferralService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
