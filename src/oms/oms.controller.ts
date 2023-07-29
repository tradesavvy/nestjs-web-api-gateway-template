import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
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
  @Get('orders')
  getOrders(@Req() req: any): any {
    return this.omsService.getOrders(req.user.username);
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
  @Post('catch/:tradeId')
  catchParent(@Req() req: any, @Param('tradeId') tradeId: string): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    return this.omsService.catchParentOrder(payload);
  }
  @Post('catch/:tradeId/:orderId')
  catchChild(
    @Req() req: any,
    @Param('tradeId') tradeId: string,
    @Param('orderId') orderId: string,
  ): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    payload.orderId = orderId;
    return this.omsService.catchChildOrder(payload);
  }
  @Post('ctc/:tradeId')
  ctcParent(@Req() req: any, @Param('tradeId') tradeId: string): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    return this.omsService.ctcParentOrder(payload);
  }
  @Post('ctc/:tradeId/:orderId')
  ctcChild(
    @Req() req: any,
    @Param('tradeId') tradeId: string,
    @Param('orderId') orderId: string,
  ): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    payload.orderId = orderId;
    return this.omsService.ctcChildOrder(payload);
  }
  @Post('exit')
  exitAll(@Req() req: any): any {
    const payload: any = {};
    payload.userName = req.user.username;
    return this.omsService.exitAll(payload);
  }
  @Post('exit/:tradeId')
  exitParentOrder(@Req() req: any, @Param('tradeId') tradeId: string): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    return this.omsService.exitParentOrder(payload);
  }
  @Post('exit/:tradeId/:orderId')
  exitChildOrder(
    @Req() req: any,
    @Param('tradeId') tradeId: string,
    @Param('orderId') orderId: string,
  ): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    payload.orderId = orderId;
    return this.omsService.exitChildOrder(payload);
  }
  @Post('cancel/:tradeId')
  cancelParentEntryOrder(
    @Req() req: any,
    @Param('tradeId') tradeId: string,
  ): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;

    return this.omsService.cancelParentEntryOrder(payload);
  }
  @Post('cancel/:tradeId/:orderId')
  cancelChildEntryOrder(
    @Req() req: any,
    @Param('tradeId') tradeId: string,
    @Param('orderId') orderId: string,
  ): any {
    const payload: any = {};
    payload.userName = req.user.username;
    payload.tradeId = tradeId;
    payload.orderId = orderId;
    return this.omsService.cancelChildEntryOrder(payload);
  }
  @Patch(':orderType/:tradeId')
  modifyParentOrder(
    @Req() req: any,
    @Param('orderType') orderType,
    @Param('tradeId') tradeId: string,
    @Body() payload: any,
  ): any {
    payload.userName = req.user.username;
    payload.ordertype = orderType;
    payload.tradeId = tradeId;
    return this.omsService.modifyParentOrder(payload);
  }
  @Patch(':orderType/:tradeId/:orderId')
  modifyChildOrder(
    @Req() req: any,
    @Param('orderType') orderType,
    @Param('tradeId') tradeId: string,
    @Param('orderId') orderId: string,
    @Body() payload: any,
  ): any {
    payload.userName = req.user.username;
    payload.ordertype = orderType;
    payload.tradeId = tradeId;
    payload.orderId = orderId;
    return this.omsService.modifyChildOrder(payload);
  }
  @Get('trends')
  getTrends(): any {
    return this.omsService.getTrends();
  }
  @Post('/strategy/order')
  placeStrategyOrder(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.convertUserMessageToStrategy(payload);
  }
  @Post('/strategy/trend')
  createStrategiesByTrend(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    payload.source = 'LAABHUM';
    return this.omsService.createStrategiesByTrend(payload);
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
