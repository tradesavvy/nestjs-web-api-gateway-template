import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OmsService } from './oms.service';
import { ApiTags } from '@nestjs/swagger';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('oms')
@ApiTags('Oms')
export class OmsController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(OmsController.name);

  constructor(private readonly omsService: OmsService) {
    super();
  }
  @UseGuards() // Empty array to exempt this method from the class-level guard
  @Get('ping')
  ping(): any {
    return this.omsService.ping();
  }
  @Post()
  placeOrder(@Body() payload: any): any {
    return this.omsService.convertUserMessageToOrder(payload);
  }
  @Get('trades')
  getTrades(@Req() req: any): any {
    return this.omsService.getTrades(req.user.username);
  }
}
