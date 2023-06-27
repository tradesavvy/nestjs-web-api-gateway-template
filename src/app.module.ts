import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstrumentModule,
    SocialModule,
    UserModule,
    AuthModule,
    TickerModule,
    OmsModule,
    ReferralModule,
    ZerodhawebhookModule,
    ConfigurationModule,
    AuditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
