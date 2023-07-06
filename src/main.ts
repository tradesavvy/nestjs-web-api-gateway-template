import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

const logger = new Logger('Main');
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
    });

    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    const config = new DocumentBuilder()
      .setTitle('Laabhum Web API')
      .setDescription('Laabhum API for Browser')
      .setVersion('1.0')
      .addTag('Laabhum Web API')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const port = process.env.PORT;
    // app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(port || 4000, '0.0.0.0');
    logger.log(process.env.APP_NAME + ' is listening ... on ' + port);
    logger.log('RabbitMQ host is  ' + process.env.RMQ_TRANSPORT_URL);
  } catch (error) {
    logger.log('Error in bootstrap ' + error);
  }
}
bootstrap();
