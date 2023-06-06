import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT;
    await app.listen(port || 4000, '0.0.0.0');
    logger.log(process.env.APP_NAME + ' is listening ... on ' + port);
    logger.log('RabbitMQ host is  ' + process.env.RMQ_TRANSPORT_URL);
  } catch (error) {
    console.log(error);
    logger.log('Error in bootstrap ' + error);
  }
}
bootstrap();
