/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from 'gamepay-dtos';
import { Observable } from 'rxjs';
import { FullUserResponseDto } from 'src/common/dtos/full-user.response.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { UserResponseDto } from 'src/common/dtos/user.response.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UserService.name);

  constructor(
    // @ts-ignore
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  onApplicationBootstrap() {
    this.userClient.connect();
  }

  getUserByEmail(payload: any): Observable<UserResponseDto> {
    const pattern = { cmd: 'getUserByEmail' };
    this.logger.log(payload);
    return this.userClient.send<UserResponseDto>(pattern, payload);
  }

  getVestingByUser(userName: string): any {
    const pattern = { cmd: 'getVestingByUser' };
    this.logger.log(userName);
    return this.userClient.send<any>(pattern, userName);
  }

  createUser(createUserDTO: CreateUserDTO) {
    this.logger.log(
      'sending createUserDTO... ' + JSON.stringify(createUserDTO),
    );
    const pattern = { cmd: 'createUser' };
    return this.userClient.send<any>(pattern, createUserDTO);
  }

  createSteamUser(createUserDTO: CreateUserDTO) {
    this.logger.log(
      'sending createUserDTO... ' + JSON.stringify(createUserDTO),
    );
    const pattern = { cmd: 'createSteamUser' };
    return this.userClient.send<any>(pattern, createUserDTO);
  }

  resetPassword(payload: any) {
    const pattern = { cmd: 'resetPasswordForUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  updateGpyPointsForUser(payload: any) {
    return this.userClient.emit<any>('updateGpyPointsForUser', payload);
  }

  updateBoostForUser(userName: string) {
    const pattern = { cmd: 'updateBoostForUser' };
    return this.userClient.send<any>(pattern, { userName });
  }

  getBoostForUser(userName: string) {
    const pattern = { cmd: 'getBoostForUser' };
    return this.userClient.send<any>(pattern, { userName });
  }

  getAllGPYPoints(username: any) {
    const pattern = { cmd: 'getAllGpyPointsForUser' };
    return this.userClient.send<any>(pattern, { username: username });
  }

  getGpyUserLeaderBoardWithFilter(query: string) {
    const pattern = { cmd: 'getGpyUserLeaderBoardWithFilter' };
    this.logger.log(query);
    return this.userClient.send<any>(pattern, query);
  }

  getGpyUserLeaderBoard(payload: any) {
    const pattern = { cmd: 'getGpyUserLeaderBoard' };
    this.logger.log(payload);
    return this.userClient.send<any>(pattern, payload);
  }

  getAllUser(payload: any) {
    const pattern = { cmd: 'getAllUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  getAllActivityByUser(payload: any) {
    const pattern = { cmd: 'getAllActivityByUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  createActivityByUser(payload: any) {
    this.logger.log(payload);
    const pattern = { cmd: 'createActivityByUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  getAllAssetByUser(username: any) {
    const pattern = { cmd: 'getAllAssetsByUser' };
    return this.userClient.send<any>(pattern, { username: username });
  }

  getAllReferralByUser(username: any) {
    const pattern = { cmd: 'getAllReferralByUser' };
    this.logger.log(username);
    return this.userClient.send<any>(pattern, { username: username });
  }

  createReferralByUser(payload: any) {
    const pattern = { cmd: 'createReferralByUser' };
    return this.userClient.send<any>(pattern, payload);
  }

  getReferralsForUser(payload: any) {
    const pattern = { cmd: 'getReferralFriend' };
    this.logger.log(
      'Friend Referral System Payload: ' + JSON.stringify(payload),
    );
    return this.userClient.send<any>(pattern, payload);
  }

  updateUser(createUserDTO: FullUserResponseDto): Observable<ResponseDto> {
    const pattern = { cmd: 'updateUserByUserName' };
    return this.userClient.send<ResponseDto>(pattern, createUserDTO);
  }

  addUser(createUserDTO: CreateUserDTO): any {
    const pattern = { cmd: 'addUser' };
    this.logger.log(`Sending addUser ${JSON.stringify(createUserDTO)}`);
    return this.userClient.send<any>(pattern, createUserDTO);
  }

  getFullUserDetailsByUserName(username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'getFullUserDetailsByUserName' };
    return this.userClient.send<ResponseDto>(pattern, username);
  }

  getShortUserDetailsByUserName(username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'getShortUserDetailsByUserName' };
    return this.userClient.send<ResponseDto>(pattern, username);
  }

  ping(): Observable<number> {
    const pattern = { cmd: 'ping' };
    const payload = [1, 2, 3];
    return this.userClient.send<number>(pattern, payload);
  }
}
