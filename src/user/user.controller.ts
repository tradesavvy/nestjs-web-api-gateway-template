import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { lastValueFrom, Observable } from 'rxjs';
import { FullUserResponseDto } from 'src/common/dtos/full-user.response.dto';
import { UserClaimEvent } from 'src/common/event/user.claim.event';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get('/leaderboard')
  async getGpyUserLeaderBoard(
    @Query('currentPage') currentPage = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search = '',
  ): Promise<any> {
    this.logger.log('UserController send Leaderboard ... ');
    return this.userService.getGpyUserLeaderBoard({
      currentPage: currentPage,
      pageSize: pageSize,
      search: search,
    });
  }

  @Get('/:username/public')
  async getShortUserDetailsByUserName(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    this.logger.log(
      'Received request for getShortUserDetailsByUserName: ' + username,
    );
    const result$ = this.userService.getShortUserDetailsByUserName(username);
    const result = await lastValueFrom(result$);
    res.status(result.statusCode || 400).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username')
  async getFullUserDetailsByUserName(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    this.logger.log(
      'Received request for getFullUserDetailsByUserName: ' + username,
    );
    // this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    // if (username !== req?.user?.username) {
    //   this.logger.log('User Unauthorized:' + username);
    //   throw new UnauthorizedException();
    // }
    const result$ = this.userService.getFullUserDetailsByUserName(username);
    const result = await lastValueFrom(result$);
    res.status(result.statusCode || 400).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  }

  @Get('/')
  async getAllUser(@Query('search') search = ''): Promise<any> {
    this.logger.log('UserController send get all user ... ');
    return this.userService.getAllUser({ search: search });
  }

  @Get('/leaderboard/filter')
  async getGpyUserLeaderBoardWithFilter(
    @Query() query: { username: string },
  ): Promise<any> {
    const queryUser = `${query.username}`;
    this.logger.log(
      'UserController send getGpyUserLeaderBoardWithFilter ... ' + queryUser,
    );
    return this.userService.getGpyUserLeaderBoardWithFilter(queryUser);
  }

  @Get('/:userName/vesting')
  async getVestingByUser(@Param('userName') userName: string): Promise<any> {
    this.logger.log('VwstingController getVestingByUser ... ');
    return this.userService.getVestingByUser(userName);
  }

  // user_gpy
  @Patch('/:username')
  async updateUserByUserName(
    @Body() createUserDTO: FullUserResponseDto,
    @Res() res: Response,
  ) {
    this.logger.log('Received request for updateUserByUserName');
    const result$ = this.userService.updateUser(createUserDTO);
    const result = await lastValueFrom(result$);
    res.status(result.statusCode || 400).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/:username/gpy')
  async getAllGPYPoints(@Param('username') username: string): Promise<any> {
    this.logger.log('UserController send gpy points ... ');
    return this.userService.getAllGPYPoints(username);
  }

  @Post('/:username/gpy')
  async updateGpyPointsForUser(@Body() event: UserClaimEvent): Promise<any> {
    this.logger.log(
      'UserController send gpy points ... ' + JSON.stringify(event),
    );
    return this.userService.updateGpyPointsForUser(event);
  }

  @Post('/:username/boost')
  async updateBoostForUser(@Param('username') userName: string): Promise<any> {
    this.logger.log('UserController send updateBoostForUser ... ' + userName);
    return this.userService.updateBoostForUser(userName);
  }

  @Get('/:username/boost')
  async getBoostForUser(@Param('username') userName: string): Promise<any> {
    this.logger.log('UserController send getBoostForUser ... ' + userName);
    return this.userService.getBoostForUser(userName);
  }

  @Get('/:username/:gpy/:desc/gpy')
  async updateGpyPointsFor(
    @Param('username') username: string,
    @Param('gpy') gpy: number,
    @Param('desc') desc: string,
    @Res() res: Response,
  ): Promise<any> {
    const claim = new UserClaimEvent(username, gpy, desc);
    this.logger.log(
      'UserController send gpy points ... ' + JSON.stringify(claim),
    );
    const result$ = this.userService.getFullUserDetailsByUserName(username);
    const result = await lastValueFrom(result$);
    if (result.status === 'success') {
      this.emitter.emit('user.claim', claim);
    }
    res.status(result.statusCode || 400).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
    return this.userService.updateGpyPointsForUser(claim);
  }

  // user_activity
  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/activity/:cp/:ps')
  async getAllActivityByUser(
    @Param('username') username: string,
    @Param('cp') page: string,
    @Param('ps') pageSize: string,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log('UserController >> getAllActivityByUser ... ' + username);
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.getAllActivityByUser({ username, page, pageSize });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:username/activity')
  async createActivityByUser(
    @Param('username') username: string,
    @Body('activity') activity: string,
    @Req() req: any,
  ) {
    this.logger.log('Received request for create activity by user');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.createActivityByUser({
      username: username,
      activity: activity,
    });
  }

  // user_activity
  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/asset')
  async getAllAssetByUser(
    @Param('username') username: string,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log('UserController send gpy points ... ');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.getAllAssetByUser(username);
  }

  // Referral system
  // user_activity
  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/referral')
  async getAllReferralByUser(
    @Param('username') username: string,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log('UserController send referral api... ');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.getAllReferralByUser(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:username/referrals')
  async createReferralForUser(
    @Param('username') username: string,
    @Body('referralCode') referralCode: string,
    @Body('myShare') myShare: string,
    @Body('friendShare') friendShare: string,
    @Body('note') note: string,
    @Body('isDefault') isDefault: boolean,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log('UserController send create referral system ... ');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.createReferralByUser({
      username,
      referralCode,
      myShare,
      friendShare,
      note,
      isDefault,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/friend-referral')
  async getReferralsForUser(
    @Param('username') username: string,
    @Query('currentPage') page = 1,
    @Query('pageSize') pageSize = 10,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log('UserController send referralfriend api... ');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    return this.userService.getReferralsForUser({ username, page, pageSize });
  }

  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.userService.ping();
  }
}
