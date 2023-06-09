import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
config();

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: 'JWT_SECRET_KEY',
        // secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '180d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthStrategy, JwtAuthService, JwtService],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
