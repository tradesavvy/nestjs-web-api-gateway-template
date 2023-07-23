import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
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
  placeOrder(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.convertUserMessageToOrder(payload);
  }

  @Get('trades')
  getTrades(@Req() req: any): any {
    return this.omsService.getTrades(req.user.username);
  }
  @Get('trades/:tradeId')
  getTradesById(@Req() req: any, @Param('tradeId') tradeId: string): any {
    {
      return this.omsService.getTradesById({
        userName: req.user.username,
        tradeId: tradeId,
      });
    }
  }
  @Post('/strategy/order')
  placeStrategyOrder(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.convertUserMessageToStrategy(payload);
  }
  @Get('/strategy')
  getStrategy(@Req() req: any): any {
    return this.omsService.getStrategies({
      userName: req.user.username,
    });
  }
  @Get('/strategy/:tradeId')
  getStrategyById(@Req() req: any, @Param('tradeId') tradeId: string): any {
    return this.omsService.getStrategyById({
      userName: req.user.username,
      tradeId: tradeId,
    });
  }
  @Post('/strategy/trend')
  createStrategiesByTrend(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.createStrategiesByTrend(payload);
  }

  @Post('/strategy/execute')
  executeUserStrategy(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.executeUserStrategy(payload);
  }
  @Post('/strategy/exit')
  exitUserStrategy(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.exitUserStrategy(payload);
  }
  @Post('/strategy/trigger')
  triggerUserStategy(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.triggerUserStategy(payload);
  }
}
