import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InstrumentModule } from './instrument/instrument.module';
import { UserServiceModule } from './user/user.module';
import { AuthServiceModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstrumentModule,
    UserServiceModule,
    AuthServiceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
