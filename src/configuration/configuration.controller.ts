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
import { ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';
import {
  CreateUserBrokerDto,
  UpdateUserBrokerDto,
  UserBroker,
  ConnectUserBroker,
  UpdateSortOrderDto,
  DeleteUserBrokerDto,
} from 'src/common/dtos/userbrokers.dto';

@Controller('configuration/broker')
@ApiTags('Configuration')
export class ConfigurationController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(ConfigurationController.name);

  constructor(private readonly configurationService: ConfigurationService) {
    super();
  }

  @Get()
  getuserBrokers(@Req() req: any): any {
    return this.configurationService.getuserBrokers({
      userName: req.user.username,
    });
  }

  @Post()
  createUserBroker(@Req() req: any, @Body() dto: CreateUserBrokerDto): any {
    this.logger.log('Received request for createUserBroker: ' + dto);
    dto.userName = req.user.username;
    return this.configurationService.createUserBroker(dto);
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
    return this.configurationService.updateUserBroker(dto);
  }

  @Put('assign/:id')
  assignPrimaryBroker(
    @Req() req: any,
    @Body() dto: any,
    @Param('id') id: string,
  ): any {
    this.logger.log('Received request for assignPrimaryBroker: ' + dto);
    return this.configurationService.assignPrimaryBroker({
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
    return this.configurationService.disconnectUserBroker(dto);
  }

  @Post('connect')
  connectUserBroker(@Req() req: any, @Body() dto: ConnectUserBroker): any {
    this.logger.log('Received request for connectUserBroker: ' + dto);

    dto.userName = req.user.username;
    return this.configurationService.connectUserBroker(dto);
  }

  @Post('activate')
  enableTrade(@Req() req: any, @Body() dto: UserBroker): any {
    dto.userName = req.user.username;
    this.logger.log('Received request for enableTrade: ' + dto);
    return this.configurationService.enableTrade(dto);
  }

  @Post('sort')
  updateSortOrder(@Req() req: any, @Body() dto: UpdateSortOrderDto): any {
    dto.userName = req.user.username;
    this.logger.log('Received request for updateSortOrder: ' + dto);
    return this.configurationService.updateSortOrder(dto);
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
    return this.configurationService.deleteUserBroker(dto);
  }
}
