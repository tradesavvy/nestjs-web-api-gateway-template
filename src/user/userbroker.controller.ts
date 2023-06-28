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
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
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

@Controller('users/userbroker')
@ApiTags('User  Brokers')
export class UserBrokersController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(UserBrokersController.name);

  constructor(
    private readonly userbrokersService: UserbrokersService,
    private readonly emitter: EventEmitter2,
  ) {
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
    this.authorizationCheck(req, dto.userName);
    dto.userName = req.user.username;
    return this.userbrokersService.createUserBroker(dto);
  }

  @Put(':username/:id')
  updateUserBroker(
    @Req() req: any,
    @Body() dto: UpdateUserBrokerDto,
    @Param('username') username: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, username);
    dto.userName = username;
    dto.userBrokerId = id;
    this.logger.log('Received request for userBrokersService: ' + dto);
    return this.userbrokersService.updateUserBroker(dto);
  }

  @Put('assign/:username/:id')
  assignPrimaryBroker(
    @Req() req: any,
    @Body() dto: any,
    @Param('username') username: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, username);

    this.logger.log('Received request for assignPrimaryBroker: ' + dto);
    return this.userbrokersService.assignPrimaryBroker({
      userName: username,
      userBrokerId: id,
    });
  }

  @Post('disconnect/:username')
  disconnectUserBroker(
    @Req() req: any,
    @Body() dto: UserBroker,
    @Param('username') username: string,
  ): any {
    this.logger.log(
      'Received request for disconnectUserBroker: ' + JSON.stringify(dto),
    );
    this.authorizationCheck(req, username);
    dto.userName = username;
    return this.userbrokersService.disconnectUserBroker(dto);
  }

  @Post('connect/:username')
  connectUserBroker(
    @Req() req: any,
    @Body() dto: ConnectUserBroker,
    @Param('username') username: string,
  ): any {
    this.logger.log('Received request for connectUserBroker: ' + dto);
    this.authorizationCheck(req, username);
    dto.userName = username;
    return this.userbrokersService.connectUserBroker(dto);
  }

  @Post('activate/:username')
  enableTrade(
    @Req() req: any,
    @Body() dto: UserBroker,
    @Param('username') username: string,
  ): any {
    this.authorizationCheck(req, username);
    dto.userName = username;
    this.logger.log('Received request for enableTrade: ' + dto);
    return this.userbrokersService.enableTrade(dto);
  }

  @Post('sort/:username')
  updateSortOrder(
    @Req() req: any,
    @Body() dto: UpdateSortOrderDto,
    @Param('username') username: string,
  ): any {
    this.authorizationCheck(req, username);
    dto.userName = username;
    this.logger.log('Received request for updateSortOrder: ' + dto);
    return this.userbrokersService.updateSortOrder(dto);
  }

  @Delete(':username/:id')
  deleteUserBroker(
    @Req() req: any,
    @Param('username') username: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, username);
    const dto: DeleteUserBrokerDto = {
      userName: username,
      userBrokerId: id,
    };
    this.logger.log('Received request for deleteUserBroker: ' + dto);
    return this.userbrokersService.deleteUserBroker(dto);
  }
}
