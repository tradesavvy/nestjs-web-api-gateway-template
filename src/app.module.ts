import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InstrumentModule } from './instrument/instrument.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TickerModule } from './ticker/ticker.module';
import { OmsModule } from './oms/oms.module';
import { SocialModule } from './social/social.module';
import { ReferralModule } from './referral/referral.module';
import { ZerodhawebhookModule } from './zerodhawebhook/zerodhawebhook.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuditModule } from './audit/audit.module';
import { VirtualTradeModule } from './virtual-trade/virtual-trade.module';
import { TimeModule } from './time/time.module';
import { TradejourneyModule } from './tradejourney/tradejourney.module';
import { TimelineModule } from './timeline/timeline.module';

import * as cookieParser from 'cookie-parser';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middleware/logging.interceptor';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstrumentModule,
    TickerModule,
    OmsModule,
    ReferralModule,
    ZerodhawebhookModule,
    ConfigurationModule,
    AuditModule,
    VirtualTradeModule,
    TimeModule,
    TradejourneyModule,
    TimelineModule,
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
