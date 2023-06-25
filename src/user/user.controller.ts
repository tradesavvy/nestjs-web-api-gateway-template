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
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserRiskProfileService } from './userriskprofile.service';
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

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userRiskProfileService: UserRiskProfileService,
    private readonly userbrokersService: UserbrokersService,
    private readonly userService: UserService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.userService.ping();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('riskprofile')
  createRiskProfile(@Req() req: any, @Body() payload: any): any {
    payload.userName = req.user.username;
    return this.userRiskProfileService.createRiskProfile(payload);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('riskprofile/:userName/:id')
  updateRiskProfile(
    @Req() req: any,
    @Body() dto: any,
    @Param('userName') userName: string,
    @Param('id') id: string,
  ): any {
    this.authorizationCheck(req, userName);
    dto.userName = userName;
    dto.riskProfileId = id;
    return this.userRiskProfileService.updateRiskProfile(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('riskprofile')
  getUserRiskProfiles(@Req() req: any): any {
    return this.userRiskProfileService.getRiskProfilesByUsername(
      req.user.username,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('riskprofile/:username/active')
  getActiveRiskProfileByUsername(
    @Req() req: any,
    @Param('username') username: string,
  ): any {
    this.authorizationCheck(req, username);
    return this.userRiskProfileService.getActiveRiskProfileByUsername(username);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('mobile/:phoneNumber')
  getUserByMobileNumber(@Param('phoneNumber') phoneNumber: string): any {
    return this.userService.getUserByMobileNumber(phoneNumber);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('userbroker')
  createUserBroker(@Req() req: any, @Body() dto: CreateUserBrokerDto): any {
    this.logger.log('Received request for createUserBroker: ' + dto);
    this.authorizationCheck(req, dto.userName);
    dto.userName = req.user.username;
    return this.userbrokersService.createUserBroker(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('userbroker/:username/:id')
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
  @Post('userbroker/disconnect/:username')
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
  @Post('userbroker/connect/:username')
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
  @Post('userbroker/activate/:username')
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
  @Post('userbroker/sort/:username')
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
  @Delete('userbroker/:username/:id')
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
