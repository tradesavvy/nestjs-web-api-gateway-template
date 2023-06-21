/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class SocialService {
  private readonly logger = new Logger(SocialService.name);

  constructor(
    // @ts-ignore
    @Inject('SOCIAL') private readonly socialClient: ClientProxy,
  ) {}

  isUserSocialHandleAvailable(
    username: string,
    socialname: string,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'isUserSocialHandleAvailable' };
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      socialname,
    });
  }

  getAllSocialSteam(): Observable<ResponseDto> {
    const pattern = { cmd: 'getAllSteamUsers' };
    return this.socialClient.send<ResponseDto>(pattern, {});
  }

  getFriends(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getFriends' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  addFriend(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'addFriendRequest' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  addVisitor(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'addVisitorToMyProfile' };
    this.logger.log(` addVisitor Request sent to remote: ` + pattern);
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  getVisitors(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getVisitors' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  getVisitorsCount(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getVisitorsCount' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  addFollower(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'addFollowerRequest' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  getFollowersCount(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getFollowersCount' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  getFollowers(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getFollowers' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  checkIfFollower(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'checkIfFollower' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  removeFollower(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'removeFollowerRequest' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  removeFriend(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'removeFriendRequest' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  changeFriendStatus(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'changeFriendStatus' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  findOrCreateDiscord(payload: any, username: string): any {
    const pattern = { cmd: 'findOrCreateDiscord' };
    payload.user_name = username;
    return this.socialClient.send<any>(pattern, payload);
  }

  findOrCreateTwitter(req: any): any {
    const pattern = { cmd: 'findOrCreateTwitter' };
    const payload = {
      id: req.id,
      username: req.username,
      displayName: req.displayName,
    };
    return this.socialClient.send<any>(pattern, payload);
  }

  findSteamSyncBySteamId(steamId: any): Observable<ResponseDto> {
    this.logger.log('find steam Account sync by: ' + steamId);
    const pattern = { cmd: 'findSteamSyncBySteamId' };
    return this.socialClient.send<ResponseDto>(pattern, { steamId });
  }

  socialSteamConnect(payload: any, username: string): any {
    this.logger.log('socail steam connect: ');
    const pattern = { cmd: 'findOrCreateSteam' };
    this.logger.log(`username: ${username}`);
    this.logger.log(`payload: ${JSON.stringify(payload)}`);
    const body = {
      username: username,
      steamId: payload._json.steamid,
      personaname: payload._json.personaname,
      profileurl: payload._json.profileurl,
      displayName: payload._json.displayName,
      primaryclanid: payload._json.primaryclanid,
      timecreated: payload._json.timecreated,
    };
    this.logger.log('steam payload is: ' + JSON.stringify(body));
    return this.socialClient.send<any>(pattern, body);
  }

  getUserSocialHandle(
    username: string,
    socialname: string,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'getUserSocialHandle' };
    this.logger.log(
      'getUserSocial: for Username: ' + username + 'with Social: ' + socialname,
    );
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      socialname,
    });
  }

  updateUserTwitterHandle(
    username: string,
    socialname: string,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'updateUserTwitterHandle' };
    this.logger.log(
      'updateUserTwitterHandle: for Username: ' +
        username +
        'with Social: ' +
        socialname,
    );
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      socialname,
    });
  }

  updateUserTelegramHandle(
    username: string,
    socialname: string,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'updateUserTelegramHandle' };
    this.logger.log(
      'updateUserTelegramHandle: for Username: ' +
        username +
        'with Social: ' +
        socialname,
    );
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      socialname,
    });
  }

  updateUserWhatAPPHandle(
    username: string,
    mobileNumber: string,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'updateUserWhatAPPHandle' };
    this.logger.log(
      'updateUserWhatAPPHandle: for Username: ' +
        username +
        'with Social: ' +
        mobileNumber,
    );
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      mobileNumber,
    });
  }

  findTwitterFollowerByUsername(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'findTwitterFollower' };
    this.logger.log('findTwitterFollower: for Username: ' + payload.username);
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  updateUserTelegramHandleInfo(
    username: string,
    socialhandle: string,
    joint: boolean,
  ): Observable<ResponseDto> {
    const pattern = { cmd: 'updateUserTelegramHandleInfo' };
    this.logger.log(
      'updateUserTwitterHandle: for Username: ' +
        username +
        'with Social: ' +
        socialhandle,
    );
    return this.socialClient.send<ResponseDto>(pattern, {
      username,
      socialhandle,
      joint,
    });
  }
  getSocialLink(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getSocialLink' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  getSocialDisconnect(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'socialDisconnect' };
    return this.socialClient.send<ResponseDto>(pattern, payload);
  }

  async validateUser(details: any) {
    const { discordId } = details;
    return details;
  }

  async validateTwitterUser(details: any) {
    const { discordId } = details;
    return details;
  }

  async validateSteamUser(details: any) {
    return details;
  }

  ping(): Observable<number> {
    const pattern = { cmd: 'ping' };
    const payload = [1, 2, 3];
    return this.socialClient.send<number>(pattern, payload);
  }
}
