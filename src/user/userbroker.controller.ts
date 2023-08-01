import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserbrokersService } from './userbrokers.service';
import {
  ConnectUserBroker,
  CreateUserBrokerDto,
  DeleteUserBrokerDto,
  UpdateSortOrderDto,
  UpdateUserBrokerDto,
  UserBroker,
} from 'src/common/dtos/userbrokers.dto';
import { AbstractJwtController } from './abstract.jwt.controller';
import { ApiKeyAuthGuard } from 'src/guard/api-key-auth.guard';

@Controller('userbroker')
@ApiTags('User  Brokers')
export class UserBrokersController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(UserBrokersController.name);

  constructor(private readonly userbrokersService: UserbrokersService) {
    super();
  }

  @Get()
  getuserBrokers(@Req() req: any): any {
    return this.userbrokersService.getuserBrokers({
      userName: req.user.username,
    });
  }

  @Post()
  createUserBroker(@Req() req: any, @Body() dto: CreateUserBrokerDto): any {
    this.logger.log('Received request for createUserBroker: ' + dto);
    dto.userName = req.user.username;
    return this.userbrokersService.createUserBroker(dto);
  }

  @Put('/:id')
  updateUserBroker(
    @Req() req: any,
    @Body() dto: UpdateUserBrokerDto,
    @Param('id') id: string,
  ): any {
    dto.userName = req.user.username;
    dto.userBrokerId = id;
    this.logger.log('Received request for userBrokersService: ' + dto);
    return this.userbrokersService.updateUserBroker(dto);
  }

  @Put('assign/:id')
  assignPrimaryBroker(
    @Req() req: any,
    @Body() dto: any,
    @Param('id') id: string,
  ): any {
    this.logger.log('Received request for assignPrimaryBroker: ' + dto);
    return this.userbrokersService.assignPrimaryBroker({
      userName: req.user.username,
      userBrokerId: id,
    });
  }

  @Post('disconnect')
  disconnectUserBroker(@Req() req: any, @Body() dto: UserBroker): any {
    this.logger.log(
      'Received request for disconnectUserBroker: ' + JSON.stringify(dto),
    );

    dto.userName = req.user.username;
    return this.userbrokersService.disconnectUserBroker(dto);
  }

  @Post('connect')
  connectUserBroker(@Req() req: any, @Body() dto: ConnectUserBroker): any {
    this.logger.log('Received request for connectUserBroker: ' + dto);

    dto.userName = req.user.username;
    return this.userbrokersService.connectUserBroker(dto);
  }

  @Post('activate')
  enableTrade(@Req() req: any, @Body() dto: UserBroker): any {
    dto.userName = req.user.username;
    this.logger.log('Received request for enableTrade: ' + dto);
    return this.userbrokersService.enableTrade(dto);
  }

  @Post('deactivate')
  disableTrade(@Req() req: any, @Body() dto: UserBroker): any {
    dto.userName = req.user.username;
    this.logger.log('Received request for disableTrade: ' + dto);
    return this.userbrokersService.disableTrade(dto);
  }

  @Post('sort')
  updateSortOrder(@Req() req: any, @Body() dto: UpdateSortOrderDto): any {
    dto.userName = req.user.username;
    this.logger.log('Received request for updateSortOrder: ' + dto);
    return this.userbrokersService.updateSortOrder(dto);
  }

  @Delete(':id')
  deleteUserBroker(
    @Req() req: any,

    @Param('id') id: string,
  ): any {
    const dto: DeleteUserBrokerDto = {
      userName: req.user.username,
      userBrokerId: id,
    };
    this.logger.log('Received request for deleteUserBroker: ' + dto);
    return this.userbrokersService.deleteUserBroker(dto);
  }
  @UseGuards(ApiKeyAuthGuard)
  @Post('reset')
  reset(): any {
    return this.userbrokersService.resetTokens();
  }
}
