import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Global Time')
@Controller('time')
export class TimeController {
  @Get()
  getIndianTime(): any {
    const currentDate = new Date();
    const indianTime = new Date(
      currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    );

    const india = { time: indianTime.toISOString(), country: 'INDIA' };
    return [india];
  }
}
