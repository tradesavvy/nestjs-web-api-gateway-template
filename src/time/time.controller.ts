import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';
@ApiTags('Global Time')
@Controller('time')
export class TimeController extends AbstractJwtController {
  getLogger(): Logger {
    throw new Error('Method not implemented.');
  }
  @Get()
  getIndianTime(): any {
    //todo check user country
    const currentDate = new Date();
    const indianTime = new Date(
      currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    );

    const india = { time: indianTime.toISOString(), country: 'INDIA' };
    return [india];
  }
}
