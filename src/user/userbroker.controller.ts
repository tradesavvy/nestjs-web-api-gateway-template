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
  UnauthorizedException,
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';

@Controller('users/userbroker')
@ApiTags('Users')
export class UserBrokersController {
  private readonly logger = new Logger(UserBrokersController.name);

  constructor(
    private readonly userbrokersService: UserbrokersService,
    private readonly emitter: EventEmitter2,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getuserBrokers(@Req() req: any): any {
    return this.userbrokersService.getuserBrokers({
      userName: req.user.username,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUserBroker(@Req() req: any, @Body() dto: CreateUserBrokerDto): any {
    this.logger.log('Received request for createUserBroker: ' + dto);
    this.authorizationCheck(req, dto.userName);
    dto.userName = req.user.username;
    return this.userbrokersService.createUserBroker(dto);
  }
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  private authorizationCheck(req: any, username: string) {
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User in Req: ' + req?.user?.username);
      this.logger.log('User in path: ' + username);
      throw new UnauthorizedException();
    }
  }
}
