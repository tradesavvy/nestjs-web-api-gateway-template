import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserglobalriskService as UserGlobalriskService } from './userglobalrisk.service';
import { ApiTags } from '@nestjs/swagger';
import { AbstractJwtController } from './abstract.jwt.controller';
import { ApiKeyAuthGuard } from 'src/guard/api-key-auth.guard';

@Controller('globalrisk')
@ApiTags('User Global Risk')
export class UserGlobalriskController extends AbstractJwtController {
  constructor(private readonly userGlobalriskService: UserGlobalriskService) {
    super();
  }
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(UserGlobalriskController.name);

  @Post()
  updateMaxLossAndDayProfit(@Req() req: any, @Body() dto: any): any {
    dto.userName = req.user.username;
    return this.userGlobalriskService.updateDayGoalAndMaxLossProfit(dto);
  }

  @Get()
  getUserGlobalRisk(@Req() req: any): any {
    return this.userGlobalriskService.getUserGlobalRisk(req.user.username);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Post('reset')
  reset(@Req() req: any, @Body() dto: any): any {
    dto.userName = req.user.username;
    return this.userGlobalriskService.resetProfit();
  }
}
