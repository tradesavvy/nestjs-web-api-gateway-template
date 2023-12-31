import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Observable, lastValueFrom } from 'rxjs';
import { SocialService } from './social.service';

@Controller('social')
@ApiTags('Social')
export class SocialController {
  private readonly logger = new Logger('SocialController');

  constructor(
    private readonly socialService: SocialService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get('/twitter/redirect/')
  @UseGuards(AuthGuard('twitter'))
  @Redirect(`${process.env.APP_FRONT_END_URL}/settings?socialConnect=true`)
  async twitterRedirect(@Req() req: Request) {
    this.logger.log('State value: ' + req.query.state);
    this.logger.log('Authorized Discord User' + JSON.stringify(req.user));
    const result$ = this.socialService.findOrCreateTwitter(req.user);
    const twitterResult = await lastValueFrom(result$).then((data: any) => {
      return data;
    });
    this.logger.log(twitterResult, +' Last Value');
    if (twitterResult.status === 'error') {
      return {
        url: `${process.env.APP_FRONT_END_URL}/settings?socialConnect=false&error="Twitter_already_Joined"`,
      };
    }
    return twitterResult;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username/link')
  async getSocialLink(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    this.logger.log('get social Link...');
    this.logger.log('Authenticate User: ' + JSON.stringify(req.user));
    if (username !== req?.user?.username) {
      this.logger.log('User Unauthorized:' + username);
      throw new UnauthorizedException();
    }
    const result$ = this.socialService.getSocialLink({ username: username });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:username/friend')
  async getFriends(
    @Param('username') username: string,
    @Query('search') search = '',
    @Res() res: Response,
  ) {
    this.logger.log(`search User Friends`);
    const result$ = this.socialService.getFriends({
      username: username,
      search: search,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/users/friend')
  async addFriend(
    @Body('username') username: string,
    @Body('friendUsername') friendUsername: string,
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    this.logger.log(`Add Friend Request`);
    const result$ = this.socialService.addFriend({
      username: username,
      friendUsername: friendUsername,
      email: email,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:username/followers/count')
  async getFollowersCount(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    this.logger.log(` getFollowersCount Request`);
    const result$ = this.socialService.getFollowersCount({
      username: username,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/users/followers')
  async addFollower(
    @Body('username') username: string,
    @Body('followUsername') followUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log(`Add follower Request`);
    const result$ = this.socialService.addFollower({
      username: username,
      followUsername: followUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/users/visitors')
  async addVisitor(
    @Body('visitorUsername') visitorUsername: string,
    @Body('visitedUsername') visitedUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log(` addVisitor Request`);
    const result$ = this.socialService.addVisitor({
      visitorUsername: visitorUsername,
      visitedUsername: visitedUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:visitedUsername/visitors')
  async getVisitors(
    @Param('visitedUsername') visitedUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log('getVisitors Request');
    const result$ = this.socialService.getVisitors({
      visitedUsername: visitedUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:username/visitors/count')
  async getVisitorsCount(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    this.logger.log('getVisitorsCount Request');
    const result$ = this.socialService.getVisitorsCount({
      username: username,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:username/followers/:followUsername')
  async checkIfFollower(
    @Param('username') username: string,
    @Param('followUsername') followUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log(` checkIfFollower Request`);
    const result$ = this.socialService.checkIfFollower({
      username: username,
      followUsername: followUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/users/:username/followers')
  async getFollowers(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    this.logger.log(` getFollowers Request`);
    const result$ = this.socialService.getFollowers({
      username: username,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Delete('/users/followers')
  async removeFollower(
    @Body('username') username: string,
    @Body('followUsername') followUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log(`remove follower Request`);
    const result$ = this.socialService.removeFollower({
      username: username,
      followUsername: followUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Delete('/users/unfriend')
  async removeFriend(
    @Body('username') username: string,
    @Body('friendUsername') friendUsername: string,
    @Res() res: Response,
  ) {
    this.logger.log(`remove Friend Request`);
    const result$ = this.socialService.removeFriend({
      username: username,
      friendUsername: friendUsername,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/users/friend/status')
  async changeFriendStatus(
    @Body('username') username: string,
    @Body('friendUsername') friendUsername: string,
    @Body('status') status: string,
    @Res() res: Response,
  ) {
    this.logger.log(`change Friend status`);
    const result$ = this.socialService.changeFriendStatus({
      username: username,
      friendUsername: friendUsername,
      status: status,
    });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/:socialname/users/:username')
  async getUserSocialHandle(
    @Param('socialname') socialname: string,
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('getUserSocial...');
    const result$ = this.socialService.getUserSocialHandle(
      username,
      socialname,
    );
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/:socialname/users/:username/isHandleAvailable')
  async isUserSocialHandleAvailable(
    @Param('socialname') socialname: string,
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('isUserSocialHandleAvailable...');
    const result$ = this.socialService.isUserSocialHandleAvailable(
      username,
      socialname,
    );
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/user/twitter')
  async saveTwitterInfo(
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('Social Handle for twitter ... ' + payload);
    const result$ = this.socialService.updateUserTwitterHandle(
      payload.username,
      payload.socialname,
    );

    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/user/telegram')
  async saveTelegramInfo(@Body() payload: any): Promise<any> {
    this.logger.log('Social Handle for telegram ... ' + payload);
    const result$ = this.socialService.updateUserTelegramHandle(
      payload.username,
      payload.socialname,
    );
    const result = await lastValueFrom(result$);
    return result;
  }

  @Post('/user/whatsapp')
  async saveWhatAPPInfo(@Body() payload: any): Promise<any> {
    this.logger.log('Social Handle for telegram ... ' + payload);
    const result$ = this.socialService.updateUserWhatAPPHandle(
      payload.username,
      payload.mobileNumber,
    );
    const result = await lastValueFrom(result$);
    return result;
  }
  @Get('/twitter/users/:username/handleFollow')
  async findTwitterUserFollowerByUsername(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    this.logger.log(`get twitter info by username`);
    const result$ = this.socialService.findTwitterFollowerByUsername({
      username: username,
    });
    const result = await lastValueFrom(result$).then((data: any) => {
      return data;
    });

    if (result.status === 'error') {
      return res.status(result.statusCode || 400).json({
        status: result.status,
        data: result.data,
        message: result.message,
      });
    }
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/user/telegramhandle')
  async saveTelegramHandleInfo(@Body() payload: any): Promise<any> {
    this.logger.log('Social Handle for telegram ... ' + payload);
    return this.socialService.updateUserTelegramHandleInfo(
      payload.username,
      payload.socialhandle,
      payload.joint,
    );
  }
  @Get('ping')
  ping(): Observable<number> {
    this.logger.log('ping...');
    return this.socialService.ping();
  }
}
